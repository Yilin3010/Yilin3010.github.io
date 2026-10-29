(() => {
 const header=document.querySelector('header');const nav=header?.querySelector('nav');if(!nav)return;
 nav.id='site-navigation';
 const button=document.createElement('button');button.type='button';button.className='mobile-menu-button';button.textContent='Menu ☰';button.setAttribute('aria-controls',nav.id);button.setAttribute('aria-expanded','false');header.insertBefore(button,nav);
 const close=()=>{header.classList.remove('mobile-nav-open');button.setAttribute('aria-expanded','false')};
 button.addEventListener('click',()=>{const open=!header.classList.contains('mobile-nav-open');header.classList.toggle('mobile-nav-open',open);button.setAttribute('aria-expanded',String(open));button.textContent=open?'Close ×':'Menu ☰'});
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{close();button.textContent='Menu ☰'}));
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('mobile-nav-open')){close();button.textContent='Menu ☰';button.focus()}});
 window.matchMedia('(max-width:650px)').addEventListener('change',()=>{close();button.textContent='Menu ☰'});
})();
