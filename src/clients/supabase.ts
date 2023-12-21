import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fswkpsqepdwqksohwaht.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzd2twc3FlcGR3cWtzb2h3YWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNDc5MzcsImV4cCI6MjAxODcyMzkzN30.QX5KLRcr-8WdJn4VxFPW0J_Fa7Fil4lu7g_VpQ2VnUg";

export const supabase = createClient(supabaseUrl, supabaseKey);
