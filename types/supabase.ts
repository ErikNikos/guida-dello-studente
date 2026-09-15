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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      aule: {
        Row: {
          created_at: string
          edificio_id: string
          id: string
          nome: string
          piano: number | null
        }
        Insert: {
          created_at?: string
          edificio_id: string
          id?: string
          nome: string
          piano?: number | null
        }
        Update: {
          created_at?: string
          edificio_id?: string
          id?: string
          nome?: string
          piano?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aule_edificio_id_fkey"
            columns: ["edificio_id"]
            isOneToOne: false
            referencedRelation: "edifici"
            referencedColumns: ["id"]
          },
        ]
      }
      canali_corso: {
        Row: {
          canale_cognomi: string
          corso_id: string
          created_at: string
          id: string
          anno_corso: number
        }
        Insert: {
          canale_cognomi: string
          corso_id: string
          created_at?: string
          id?: string
          anno_corso: number
        }
        Update: {
          canale_cognomi?: string
          corso_id?: string
          created_at?: string
          id?: string
          anno_corso?: number
        }
        Relationships: [
          {
            foreignKeyName: "canali_corso_corso_id_fkey"
            columns: ["corso_id"]
            isOneToOne: false
            referencedRelation: "corsi_laurea"
            referencedColumns: ["id"]
          },
        ]
      }
      corsi_laurea: {
        Row: {
          created_at: string
          dipartimento: string
          durata_anni: number
          id: string
          nome: string
          tipo_corso: string
        }
        Insert: {
          created_at?: string
          dipartimento: string
          durata_anni: number
          id?: string
          nome: string
          tipo_corso: string
        }
        Update: {
          created_at?: string
          dipartimento?: string
          durata_anni?: number
          id?: string
          nome?: string
          tipo_corso?: string
        }
        Relationships: []
      }
      edifici: {
        Row: {
          categoria: string | null
          created_at: string
          id: string
          latitudine: number | null
          longitudine: number | null
          nome: string
        }
        Insert: {
          categoria?: string | null
          created_at?: string
          id?: string
          latitudine?: number | null
          longitudine?: number | null
          nome: string
        }
        Update: {
          categoria?: string | null
          created_at?: string
          id?: string
          latitudine?: number | null
          longitudine?: number | null
          nome?: string
        }
        Relationships: []
      }
      insegnamenti: {
        Row: {
          canale_corso_id: string
          created_at: string
          docente_nome: string | null
          id: string
          nome: string
          semestre: number
        }
        Insert: {
          canale_corso_id: string
          created_at?: string
          docente_nome?: string | null
          id?: string
          nome: string
          semestre: number
        }
        Update: {
          canale_corso_id?: string
          created_at?: string
          docente_nome?: string | null
          id?: string
          nome?: string
          semestre?: number
        }
        Relationships: [
          {
            foreignKeyName: "insegnamenti_canale_corso_id_fkey"
            columns: ["canale_corso_id"]
            isOneToOne: false
            referencedRelation: "canali_corso"
            referencedColumns: ["id"]
          },
        ]
      }
      lezioni: {
        Row: {
          aula_id: string | null
          created_at: string
          giorno_settimana: number
          id: string
          insegnamento_id: string
          note: string | null
          ora_fine: string
          ora_inizio: string
        }
        Insert: {
          aula_id?: string | null
          created_at?: string
          giorno_settimana: number
          id?: string
          insegnamento_id: string
          note?: string | null
          ora_fine: string
          ora_inizio: string
        }
        Update: {
          aula_id?: string | null
          created_at?: string
          giorno_settimana?: number
          id?: string
          insegnamento_id?: string
          note?: string | null
          ora_fine?: string
          ora_inizio?: string
        }
        Relationships: [
          {
            foreignKeyName: "lezioni_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lezioni_insegnamento_id_fkey"
            columns: ["insegnamento_id"]
            isOneToOne: false
            referencedRelation: "insegnamenti"
            referencedColumns: ["id"]
          },
        ]
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
