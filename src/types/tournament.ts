import { Database } from './supabase'

export type Tournament = Database['public']['Tables']['tournaments']['Row']
export type TournamentByMonth = Record<string, Tournament[]>
