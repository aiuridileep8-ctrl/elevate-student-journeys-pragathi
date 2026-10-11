import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") return response({ error: "Method not allowed." }, 405);

  const authorization = request.headers.get("Authorization");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("NOTIFICATION_FROM");
  if (!authorization || !supabaseUrl || !supabaseAnonKey) {
    return response({ error: "Authentication is unavailable." }, 500);
  }
  const accessToken = authorization.replace(/^Bearer\s+/i, "");
  if (accessToken === authorization || !accessToken) {
    return response({ error: "A bearer access token is required." }, 401);
  }
  if (!resendApiKey || !fromEmail) {
    return response({ error: "Email delivery is not configured on the server." }, 503);
  }

  let interventionId: string;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("interventionId" in body)) {
      return response({ error: "An intervention ID is required." }, 400);
    }
    interventionId = String(body.interventionId);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(interventionId)) {
      return response({ error: "The intervention ID is invalid." }, 400);
    }
  } catch {
    return response({ error: "The request body must be valid JSON." }, 400);
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authorization } },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user)
    return response({ error: "Sign in to send this notification." }, 401);

  const { data: intervention, error: interventionError } = await client
    .from("interventions")
    .select("id, student_name, action, counsellor, counsellor_email, assigned_by")
    .eq("id", interventionId)
    .eq("assigned_by", userData.user.id)
    .maybeSingle();
  if (interventionError || !intervention) {
    return response({ error: "The assigned intervention could not be verified." }, 404);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intervention.counsellor_email)) {
    return response({ error: "The assigned counsellor email is invalid." }, 400);
  }

  const subject = `Student support assignment: ${intervention.student_name}`;
  const text = `${intervention.counsellor},\n\nYou have been assigned "${intervention.action}" for ${intervention.student_name} in Stride.\n\nSign in to Stride with this email address to view the in-app notification.\n`;
  const html = `<p>${escapeHtml(intervention.counsellor)},</p><p>You have been assigned <strong>${escapeHtml(intervention.action)}</strong> for ${escapeHtml(intervention.student_name)} in Stride.</p><p>Sign in to Stride with this email address to view the in-app notification.</p>`;

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [intervention.counsellor_email],
        subject,
        text,
        html,
      }),
    });
  } catch (cause) {
    console.error("Email provider request failed:", cause);
    return response({ error: "The email provider could not be reached." }, 502);
  }
  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    console.error("Email provider rejected intervention notification:", details);
    return response({ error: "The email provider could not send the notification." }, 502);
  }

  return response({ emailSent: true });
});
