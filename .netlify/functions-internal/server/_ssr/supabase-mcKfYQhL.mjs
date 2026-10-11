import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-mcKfYQhL.js
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_Cw4gsCCnIR6ebfgROYT-Tg_mXY-WtCM",
	"VITE_SUPABASE_URL": "https://pqicywfwfjnjridwzjeh.supabase.co"
}["VITE_SUPABASE_URL"];
var supabasePublishableKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_Cw4gsCCnIR6ebfgROYT-Tg_mXY-WtCM",
	"VITE_SUPABASE_URL": "https://pqicywfwfjnjridwzjeh.supabase.co"
}["VITE_SUPABASE_PUBLISHABLE_KEY"];
var supabase = Boolean(supabaseUrl && supabasePublishableKey) ? createClient(supabaseUrl, supabasePublishableKey, { auth: {
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true
} }) : null;
//#endregion
export { supabase as t };
