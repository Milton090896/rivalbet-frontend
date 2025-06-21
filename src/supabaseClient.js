import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://quwucwhdiwmnbbvyusex.supabase.co' // substitua pelo seu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d3Vjd2hkaXdtbmJidnl1c2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzczMTEsImV4cCI6MjA2MzkxMzMxMX0.yKb6VgAJ8--pZsB5upnJ4onV5Ve70h6QVIvV0PZYrtQ' // substitua pela sua chave

export const supabase = createClient(supabaseUrl, supabaseKey)
