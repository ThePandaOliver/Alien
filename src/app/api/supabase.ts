import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dunnhaxqkdtjxfrdwfmj.supabase.co'
export const supabaseKey = process.env.SUPABASE_TOKEN
export const supabase = createClient(supabaseUrl, supabaseKey!)