export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      circuit: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          circuit: string | null
          created_at: string
          currentGame: string | null
          id: number
          serving: string | null
          set1T1: number | null
          set1T2: number | null
          set2T1: number | null
          set2T2: number | null
          set3T1: number | null
          set3T2: number | null
          team1: string | null
          team2: string | null
          winner: string | null
        }
        Insert: {
          circuit?: string | null
          created_at?: string
          currentGame?: string | null
          id?: number
          serving?: string | null
          set1T1?: number | null
          set1T2?: number | null
          set2T1?: number | null
          set2T2?: number | null
          set3T1?: number | null
          set3T2?: number | null
          team1?: string | null
          team2?: string | null
          winner?: string | null
        }
        Update: {
          circuit?: string | null
          created_at?: string
          currentGame?: string | null
          id?: number
          serving?: string | null
          set1T1?: number | null
          set1T2?: number | null
          set2T1?: number | null
          set2T2?: number | null
          set3T1?: number | null
          set3T2?: number | null
          team1?: string | null
          team2?: string | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "liveScore_circuit_fkey"
            columns: ["circuit"]
            isOneToOne: false
            referencedRelation: "circuit"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          circuit: string | null
          created_at: string
          gender: string | null
          id: string
          name: string | null
          nationality: string | null
          nationality_flag: string | null
          points: number | null
          ranking: number | null
        }
        Insert: {
          circuit?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          name?: string | null
          nationality?: string | null
          nationality_flag?: string | null
          points?: number | null
          ranking?: number | null
        }
        Update: {
          circuit?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          name?: string | null
          nationality?: string | null
          nationality_flag?: string | null
          points?: number | null
          ranking?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_circuit_fkey"
            columns: ["circuit"]
            isOneToOne: false
            referencedRelation: "circuit"
            referencedColumns: ["id"]
          },
        ]
      }
      score_history: {
        Row: {
          circuit: string | null
          created_at: string
          currentGame: string | null
          id: number
          serving: string | null
          set1T1: number | null
          set1T2: number | null
          set2T1: number | null
          set2T2: number | null
          set3T1: number | null
          set3T2: number | null
          team1: string | null
          team2: string | null
          winner: string | null
        }
        Insert: {
          circuit?: string | null
          created_at?: string
          currentGame?: string | null
          id?: number
          serving?: string | null
          set1T1?: number | null
          set1T2?: number | null
          set2T1?: number | null
          set2T2?: number | null
          set3T1?: number | null
          set3T2?: number | null
          team1?: string | null
          team2?: string | null
          winner?: string | null
        }
        Update: {
          circuit?: string | null
          created_at?: string
          currentGame?: string | null
          id?: number
          serving?: string | null
          set1T1?: number | null
          set1T2?: number | null
          set2T1?: number | null
          set2T2?: number | null
          set3T1?: number | null
          set3T2?: number | null
          team1?: string | null
          team2?: string | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "score_history_circuit_fkey"
            columns: ["circuit"]
            isOneToOne: false
            referencedRelation: "circuit"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
