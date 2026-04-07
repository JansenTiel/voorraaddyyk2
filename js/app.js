function byId(id){
  return document.getElementById(id);
}

function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#039;'
  }[m]));
}

function cleanSku(v){
  return String(v || '').trim().toUpperCase().replace(/\s+/g, '');
}

function normalizeScan(v){
  return String(v || '')
    .replace(/\//g, '-')
    .replace(/\\/g, '-')
    .replace(/\s+/g, '')
    .trim()
    .toUpperCase();
}

function nlTime(v){
  if(!v) return '';
  try{
    const d = new Date(v);
    if(isNaN(d.getTime())) return String(v);
    return d.toLocaleString('nl-NL');
  }catch{
    return String(v);
  }
}

function toast(msg, type='ok'){
  const el = byId('toast');
  if(!el){
    alert(msg);
    return;
  }

  el.textContent = msg;
  el.className = `notice ${type}`;
  el.style.display = 'block';

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    el.style.display = 'none';
  }, 5000);
}

function setActiveNav(){
  const currentPath = location.pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '');

  document.querySelectorAll('.nav a').forEach(a => {
    const rawHref = a.getAttribute('href') || '';
    const hrefPath = rawHref
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '');

    if(
      hrefPath === currentPath ||
      (hrefPath === '/' && (currentPath === '/' || currentPath === ''))
    ){
      a.classList.add('active');
    }
  });
}

async function countOrderUses(client, orderNo){
  const { count, error } = await client
    .from('movements')
    .select('*', { count:'exact', head:true })
    .eq('type', 'OUT')
    .eq('order_no', orderNo);

  if(error) throw error;
  return count || 0;
}

function getSkuBaseFromUnique(skuUnique){
  const s = normalizeScan(skuUnique);
  const match = s.match(/^(.*)-(\d{5})$/);
  if(match) return match[1].toUpperCase();
  return s.toUpperCase();
}

function isValidUniqueSku(s){
  return /^(.*)-\d{5}$/.test(normalizeScan(s));
}
