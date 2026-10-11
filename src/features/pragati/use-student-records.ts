import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchStudentRecords } from "./student-repository";
import type { Student } from "./data";

export function useStudentRecords(enabled: boolean) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const records = await fetchStudentRecords();
      setStudents(records);
      setLastUpdated(new Date().toLocaleTimeString());
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Student records could not be refreshed.");
      throw cause;
    }
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!enabled || !client) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    void fetchStudentRecords()
      .then((records) => {
        if (!active) return;
        setStudents(records);
        setLastUpdated(new Date().toLocaleTimeString());
        setError("");
      })
      .catch((cause: unknown) => {
        console.error("Unable to load student records:", cause);
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Student records could not be loaded. Please try again.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const channel = client
      .channel("live-student-records")
      .on("postgres_changes", { event: "*", schema: "public", table: "students" }, () => {
        void fetchStudentRecords()
          .then((records) => {
            if (!active) return;
            setStudents(records);
            setLastUpdated(new Date().toLocaleTimeString());
            setError("");
          })
          .catch((cause: unknown) => {
            console.error("Unable to refresh student records:", cause);
            if (active) {
              setError(
                cause instanceof Error ? cause.message : "Student records could not be refreshed.",
              );
            }
          });
      })
      .subscribe((status, cause) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Student live updates are unavailable:", cause);
          if (active) setError("Live updates are unavailable. Reload to check the latest records.");
        }
      });

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [enabled]);

  return { students, loading, error, lastUpdated, refresh, setError };
}
