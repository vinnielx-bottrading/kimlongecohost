function activate(i){document.querySelectorAll('[role=tab]').forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;document.getElementById('panel'+j).hidden=i!==j});}
function zoom(b){const im=b.querySelector('img'),v=document.getElementById('viewer');v.querySelector('img').src=im.dataset.full||im.src;v.querySelector('img').alt=im.alt;v.showModal()}
document.querySelector('nav').addEventListener('keydown',e=>{const tabs=[...document.querySelectorAll('[role=tab]')],i=tabs.indexOf(document.activeElement);if(i<0)return;let n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();activate(n);tabs[n].focus()});document.getElementById('viewer').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});

(function(){
  const fmt=n=>Math.round(n).toLocaleString('vi-VN')+' đ';
  function calc(t){let sum=0;t.querySelectorAll('tbody tr[data-price]').forEach(r=>{const q=Math.max(0,parseFloat(r.querySelector('.qty').value)||0),a=q*Number(r.dataset.price);r.querySelector('.amount').textContent=fmt(a);sum+=a});const tot=t.querySelector('tfoot .num');if(tot)tot.textContent=fmt(sum);t.dataset.total=sum}
  function grand(){let g=0;document.querySelectorAll('[data-sum]').forEach(c=>{const t=document.getElementById(c.dataset.sum),v=t?Number(t.dataset.total||0):0;c.textContent=fmt(v);g+=v});const el=document.getElementById('grand-total');if(el)el.textContent=fmt(g)}
  document.querySelectorAll('table.quote').forEach(t=>{t.addEventListener('input',()=>{calc(t);grand()});calc(t)});grand();
})();

(function(){
  const fmt=n=>Math.round(n).toLocaleString('vi-VN')+' đ';
  const tables=document.getElementById('menu-tables'),row=document.getElementById('row-bantiec');
  if(!tables)return;
  const gala=document.getElementById('quote-gala'),rowQty=row&&row.querySelector('.qty');
  let picked=null;
  function refresh(){const n=Math.max(0,parseFloat(tables.value)||0);
    document.getElementById('menu-choice').textContent=picked?picked.dataset.combo+' · '+picked.dataset.pack:'Chưa chọn combo';
    document.getElementById('menu-total').textContent=picked?fmt(n*Number(picked.dataset.price)):'0 đ'}
  function pushToQuote(){if(!row||!picked)return;row.dataset.price=picked.dataset.price;
    row.children[3].textContent=fmt(Number(picked.dataset.price));
    row.children[5].textContent=picked.dataset.combo+' – '+picked.dataset.pack+'/bàn 10 khách (xem tab Menu tiệc)';
    rowQty.value=tables.value;gala.dispatchEvent(new Event('input',{bubbles:true}))}
  document.querySelectorAll('.combo .pick').forEach(b=>b.addEventListener('click',()=>{
    const c=b.closest('.combo');
    document.querySelectorAll('.combo').forEach(x=>{x.classList.remove('is-picked');x.querySelector('.pick').setAttribute('aria-pressed','false');x.querySelector('.pick').textContent='Chọn combo này'});
    c.classList.add('is-picked');b.setAttribute('aria-pressed','true');b.textContent='Đã chọn';picked=c;refresh();pushToQuote()}));
  tables.addEventListener('input',()=>{refresh();if(picked){rowQty.value=tables.value;gala.dispatchEvent(new Event('input',{bubbles:true}))}});
  if(rowQty)rowQty.addEventListener('input',()=>{if(picked){tables.value=rowQty.value;refresh()}});
  document.querySelectorAll('.packbtn').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.packbtn').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    const k=b.dataset.pack;['2500','1800'].forEach(p=>document.getElementById('pack-'+p).hidden=!(k==='all'||k===p))}));
  refresh();
})();
(function(){const nav=document.querySelector('nav'),bar=document.querySelector('.menu-pick');if(!nav||!bar)return;const f=()=>bar.style.top=nav.offsetHeight+'px';f();addEventListener('resize',f);})();
