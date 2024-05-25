import { Database } from "./supabase";

export type Circuit = Database["public"]["Tables"]["circuit"]["Row"]
export type CircuitMap = Record<string, Circuit>