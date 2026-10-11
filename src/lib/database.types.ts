export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      staff_access: {
        Row: {
          user_id: string;
          role: "admin" | "staff";
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role?: "admin" | "staff";
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: "admin" | "staff";
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      students: {
        Row: {
          student_id: string;
          name: string;
          department: string;
          year_label: string;
          academic_year: string;
          semester: number;
          attendance: number;
          grades: number;
          backlogs: number;
          missed: number;
          fees: number;
          engagement: number;
          placement: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          student_id: string;
          name: string;
          department: string;
          year_label: string;
          academic_year: string;
          semester: number;
          attendance: number;
          grades: number;
          backlogs: number;
          missed: number;
          fees?: number;
          engagement: number;
          placement: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          student_id?: string;
          name?: string;
          department?: string;
          year_label?: string;
          academic_year?: string;
          semester?: number;
          attendance?: number;
          grades?: number;
          backlogs?: number;
          missed?: number;
          fees?: number;
          engagement?: number;
          placement?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      interventions: {
        Row: {
          id: string;
          student_id: string;
          student_name: string;
          action: string;
          counsellor: string;
          counsellor_email: string;
          assigned_by: string;
          status: "Planned" | "In progress" | "Completed";
          due_date: string | null;
          notes: string;
          completion_outcome: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          student_name: string;
          action: string;
          counsellor: string;
          counsellor_email: string;
          assigned_by: string;
          status?: "Planned" | "In progress" | "Completed";
          due_date?: string | null;
          notes?: string;
          completion_outcome?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          student_name?: string;
          action?: string;
          counsellor?: string;
          counsellor_email?: string;
          assigned_by?: string;
          status?: "Planned" | "In progress" | "Completed";
          due_date?: string | null;
          notes?: string;
          completion_outcome?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "interventions_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["student_id"];
          },
        ];
      };
      intervention_notifications: {
        Row: {
          id: string;
          recipient_email: string;
          title: string;
          body: string;
          intervention_id: string;
          created_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          recipient_email: string;
          title: string;
          body: string;
          intervention_id: string;
          created_at?: string;
          read_at?: string | null;
        };
        Update: {
          id?: string;
          recipient_email?: string;
          title?: string;
          body?: string;
          intervention_id?: string;
          created_at?: string;
          read_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "intervention_notifications_intervention_id_fkey";
            columns: ["intervention_id"];
            isOneToOne: false;
            referencedRelation: "interventions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
