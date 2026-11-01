(() => {
 const links=[...document.querySelectorAll('.case-gallery figure a, .personal-carousel .photo-slide a')];
 if(!links.length)return;
 const items=links.map(link=>({src:link.href,caption:link.closest('figure').querySelector('figcaption')?.textContent||link.querySelector('img').alt}));
 const viewer=document.createElement('dialog');viewer.className='image-viewer';viewer.setAttribute('aria-label',document.querySelector('.personal-carousel')?'Personal photo viewer':'Project image viewer');
 viewer.innerHTML=`<div class="viewer-toolbar"><span class="viewer-count" aria-live="polite"></span><div class="viewer-actions"><button type="button" data-action="out" aria-label="Zoom out">−</button><button type="button" data-action="reset" aria-label="Reset zoom">100%</button><button type="button" data-action="in" aria-label="Zoom in">+</button><button type="button" data-action="close" aria-label="Close image viewer">×</button></div></div><div class="viewer-stage" tabindex="0" aria-label="Image area. Scroll to inspect a zoomed image."><img class="viewer-image" alt=""></div><div class="viewer-bottom"><button type="button" data-action="previous" aria-label="Previous image">←</button><p class="viewer-caption" aria-live="polite"></p><button type="button" data-action="next" aria-label="Next image">→</button></div><p class="viewer-hint">← → Browse · + − Zoom · 0 Reset · Esc Close</p>`;
 document.body.append(viewer);
 const image=viewer.querySelector('.viewer-image'),stage=viewer.querySelector('.viewer-stage'),zoomButton=viewer.querySelector('[data-action="reset"]');
 let index=0,zoom=1,opener,fitWidth=0,priorOverflow='';
 function applyZoom(){image.style.width=`${fitWidth*zoom}px`;zoomButton.textContent=`${Math.round(zoom*100)}%`;viewer.querySelector('[data-action="out"]').disabled=zoom<=1;viewer.querySelector('[data-action="in"]').disabled=zoom>=4;}
 function fit(){if(!image.naturalWidth)return;fitWidth=Math.max(1,Math.min(image.naturalWidth,stage.clientWidth-24,(stage.clientHeight-24)*image.naturalWidth/image.naturalHeight));applyZoom();}
 function changeZoom(amount){zoom=Math.max(1,Math.min(4,Math.round((zoom+amount)*100)/100));applyZoom();}
 function show(next){index=(next+items.length)%items.length;zoom=1;image.style.visibility='hidden';image.alt=items[index].caption;image.src=items[index].src;viewer.querySelector('.viewer-count').textContent=`${index+1} / ${items.length}`;viewer.querySelector('.viewer-caption').textContent=items[index].caption;stage.scrollTop=0;stage.scrollLeft=0;}
 image.addEventListener('load',()=>{fit();image.style.visibility='visible'});
 links.forEach((link,i)=>{link.removeAttribute('target');link.setAttribute('aria-haspopup','dialog');link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();opener=link;priorOverflow=document.body.style.overflow;viewer.showModal();document.body.style.overflow='hidden';show(i);viewer.querySelector('[data-action="close"]').focus();});});
 function action(name){if(name==='close')viewer.close();if(name==='next')show(index+1);if(name==='previous')show(index-1);if(name==='in')changeZoom(.25);if(name==='out')changeZoom(-.25);if(name==='reset'){zoom=1;fit();stage.scrollTop=0;stage.scrollLeft=0;}}
 viewer.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));
 viewer.addEventListener('keydown',event=>{const key=event.key;if(['ArrowRight','ArrowLeft','+','=','-','0'].includes(key)){event.preventDefault();action(key==='ArrowRight'?'next':key==='ArrowLeft'?'previous':key==='-'?'out':key==='0'?'reset':'in')}});
 viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
 viewer.addEventListener('close',()=>{document.body.style.overflow=priorOverflow;opener?.focus()});
 window.addEventListener('resize',()=>{if(viewer.open)fit()});
})();
