import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
console.log('🚀 ~ supabaseUrl:', supabaseUrl)
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
console.log('🚀 ~ supabaseAnonKey:', supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})
