export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          code: string | null
          description: string | null
          icon_path: string | null
          id: string
          title: string | null
        }
        Insert: {
          code?: string | null
          description?: string | null
          icon_path?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          code?: string | null
          description?: string | null
          icon_path?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      class_lessons: {
        Row: {
          class_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_lessons_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_lessons_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      class_students: {
        Row: {
          class_id: string
          student_id: string
        }
        Insert: {
          class_id: string
          student_id: string
        }
        Update: {
          class_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          state: string | null
          teacher_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          state?: string | null
          teacher_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          state?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          asset_pack_path: string | null
          content: Json | null
          created_at: string | null
          grade: number | null
          id: string
          language: string | null
          subject: string | null
          title: string | null
          version: number | null
        }
        Insert: {
          asset_pack_path?: string | null
          content?: Json | null
          created_at?: string | null
          grade?: number | null
          id?: string
          language?: string | null
          subject?: string | null
          title?: string | null
          version?: number | null
        }
        Update: {
          asset_pack_path?: string | null
          content?: Json | null
          created_at?: string | null
          grade?: number | null
          id?: string
          language?: string | null
          subject?: string | null
          title?: string | null
          version?: number | null
        }
        Relationships: []
      }
      student_badges: {
        Row: {
          awarded_at: string | null
          badge_id: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          awarded_at?: string | null
          badge_id?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          awarded_at?: string | null
          badge_id?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          activity_id: string | null
          id: string
          lesson_id: string | null
          max_score: number | null
          score: number | null
          student_id: string | null
          synced: boolean | null
          timestamp: string | null
        }
        Insert: {
          activity_id?: string | null
          id?: string
          lesson_id?: string | null
          max_score?: number | null
          score?: number | null
          student_id?: string | null
          synced?: boolean | null
          timestamp?: string | null
        }
        Update: {
          activity_id?: string | null
          id?: string
          lesson_id?: string | null
          max_score?: number | null
          score?: number | null
          student_id?: string | null
          synced?: boolean | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          grade: number | null
          id: string
          name: string | null
          school: string | null
        }
        Insert: {
          created_at?: string | null
          grade?: number | null
          id: string
          name?: string | null
          school?: string | null
        }
        Update: {
          created_at?: string | null
          grade?: number | null
          id?: string
          name?: string | null
          school?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          school: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          school?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          school?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          name: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
