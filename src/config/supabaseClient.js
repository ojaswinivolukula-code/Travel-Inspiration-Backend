import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
// import { fetch } from "undici";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  // {
  //   global: {
  //     fetch: fetch,
  //   },
  // }
);

export default supabase;