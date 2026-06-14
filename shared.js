// Page transition fade
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
  document.body.classList.remove('page-leaving');

  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-leaving');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('revealed');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Fix for browser back/forward (bfcache) leaving the page in a faded-out state
window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-leaving');
  document.body.classList.add('page-loaded');
});
