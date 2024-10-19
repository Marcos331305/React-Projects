import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jtkvoybhdzubigjztpft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0a3ZveWJoZHp1Ymlnanp0cGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMjk2MjEsImV4cCI6MjA0NDkwNTYyMX0._JUKYbZX-e9Psall0fBZl91AZUPGha2eTxFPmiRDXig";

export const supabase = createClient(supabaseUrl, supabaseKey);
