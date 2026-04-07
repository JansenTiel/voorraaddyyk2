const SUPABASE_URL = "https://nfkyezemyedvfyqimhpm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_bD0410b0UhusLqrMvKcoEw_2FCi9duM";

let _client = null;

function sb(){
  if(!_client){
    _client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _client;
}
