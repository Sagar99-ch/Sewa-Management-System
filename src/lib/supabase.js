import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kmrzrplfkanzbudpofhk.supabase.co";
const supabaseKey = "sb_publishable_GQU2S4VaFFU64MK-utfJhA_mSb0n20h";

export const supabase = createClient(supabaseUrl, supabaseKey);
