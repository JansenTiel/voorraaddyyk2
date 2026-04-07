window.SUPABASE_URL = 'https://nfkyezemyedvfyqimhpm.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_bD0410b0UhusLqrMvKcoEw_2FCi9duM';

window.sb = function(){
  if(!window.supabase || !window.supabase.createClient)
    throw new Error('Supabase library niet geladen.');

  if(!window._sbClient){
    window._sbClient = window.supabase.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
  }

  return window._sbClient;
};
