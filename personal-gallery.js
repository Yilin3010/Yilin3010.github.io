(() => {
  document.querySelectorAll('.personal-carousel').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.photo-slide')];
    const position = carousel.querySelector('.photo-position');
    let current = 0;
    function show(next) {
      current = (next + slides.length) % slides.length;
      slides.forEach((slide, index) => { slide.hidden = index !== current; });
      position.textContent = `${current + 1} / ${slides.length}`;
    }
    carousel.querySelectorAll('[data-direction]').forEach(button => {
      button.addEventListener('click', () => show(current + Number(button.dataset.direction)));
    });
    carousel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
      carousel.querySelector('.photo-slide:not([hidden]) a').focus();
    });
    // Keep browsing manual so photos never change while someone is reading.
  });
})();
