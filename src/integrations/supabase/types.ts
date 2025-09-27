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
      achievements: {
        Row: {
          code: string
          description: string
          id: string
          name: string
          threshold: number
          type: string
        }
        Insert: {
          code: string
          description: string
          id?: string
          name: string
          threshold: number
          type: string
        }
        Update: {
          code?: string
          description?: string
          id?: string
          name?: string
          threshold?: number
          type?: string
        }
        Relationships: []
      }
      attempts: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string | null
          selected_choice: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id?: string | null
          selected_choice: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string | null
          selected_choice?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      curriculum_lessons: {
        Row: {
          content: Json | null
          created_at: string | null
          grade: number
          id: string
          is_active: boolean | null
          lesson_description: string | null
          lesson_title: string
          lesson_type: string | null
          order_sequence: number
          subject: string
          unit_number: number
          unit_title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          grade: number
          id?: string
          is_active?: boolean | null
          lesson_description?: string | null
          lesson_title: string
          lesson_type?: string | null
          order_sequence: number
          subject: string
          unit_number: number
          unit_title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          grade?: number
          id?: string
          is_active?: boolean | null
          lesson_description?: string | null
          lesson_title?: string
          lesson_type?: string | null
          order_sequence?: number
          subject?: string
          unit_number?: number
          unit_title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      lesson_questions: {
        Row: {
          choices: Json | null
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          lesson_id: string | null
          marks: number | null
          question_text: string
          question_type: string | null
        }
        Insert: {
          choices?: Json | null
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          lesson_id?: string | null
          marks?: number | null
          question_text: string
          question_type?: string | null
        }
        Update: {
          choices?: Json | null
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          lesson_id?: string | null
          marks?: number | null
          question_text?: string
          question_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "curriculum_lessons"
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          daily_goal: number
          full_name: string | null
          grade: string | null
          id: string
          role: string
          streak: number
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          daily_goal?: number
          full_name?: string | null
          grade?: string | null
          id: string
          role: string
          streak?: number
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          daily_goal?: number
          full_name?: string | null
          grade?: string | null
          id?: string
          role?: string
          streak?: number
          xp?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          choices: Json
          correct_choice: string
          id: string
          lesson_id: string | null
          prompt: string
        }
        Insert: {
          choices: Json
          correct_choice: string
          id?: string
          lesson_id?: string | null
          prompt: string
        }
        Update: {
          choices?: Json
          correct_choice?: string
          id?: string
          lesson_id?: string | null
          prompt?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
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
      student_lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          is_unlocked: boolean | null
          lesson_id: string | null
          score: number | null
          student_id: string
          total_questions: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          is_unlocked?: boolean | null
          lesson_id?: string | null
          score?: number | null
          student_id: string
          total_questions?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          is_unlocked?: boolean | null
          lesson_id?: string | null
          score?: number | null
          student_id?: string
          total_questions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "curriculum_lessons"
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
      subjects: {
        Row: {
          grade: string
          id: string
          name: string
        }
        Insert: {
          grade: string
          id?: string
          name: string
        }
        Update: {
          grade?: string
          id?: string
          name?: string
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
      user_achievements: {
        Row: {
          achieved_at: string | null
          achievement_id: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          achievement_id: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          achievement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      leaderboard: {
        Row: {
          full_name: string | null
          streak: number | null
          user_id: string | null
          xp: number | null
        }
        Insert: {
          full_name?: string | null
          streak?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Update: {
          full_name?: string | null
          streak?: number | null
          user_id?: string | null
          xp?: number | null
        }
        Relationships: []
      }
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
