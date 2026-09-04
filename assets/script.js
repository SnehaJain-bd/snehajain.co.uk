/* =========================================================
   Sneha Jain — snehajain.co.uk
   Small progressive enhancements. The site works without any
   of this; nothing here is required to read the page.
   ========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- London clock in the status bar ----------
     Always shows Sneha's local time, not the visitor's, so the
     "available for work" line means something. */
  var clock = document.getElementById('clock');
  var today = document.getElementById('today');

  function tick() {
    var now = new Date();
    try {
      if (clock) {
        clock.textContent = now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      if (today) {
        today.textContent = now.toLocaleDateString('en-GB', {
          timeZone: 'Europe/London',
          day: 'numeric',
          month: 'long'
        });
      }
    } catch (e) {
      /* Old browser without full Intl time zone data — fall back to local. */
      if (clock) clock.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
      if (today) today.textContent = '';
    }
  }
  if (clock || today) {
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var head = document.querySelector('.site-head');

  function setHeadHeight() {
    if (!head) return;
    var r = head.getBoundingClientRect();
    document.documentElement.style.setProperty('--head-h', Math.round(r.bottom) + 'px');
  }
  setHeadHeight();
  window.addEventListener('resize', setHeadHeight);
  window.addEventListener('scroll', setHeadHeight, { passive: true });

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Scroll reveals ---------- */
  var items = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ: one open answer per group ---------- */
  document.querySelectorAll('.faq-group').forEach(function (group) {
    var all = group.querySelectorAll('details.qa');
    all.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        all.forEach(function (other) { if (other !== d) other.open = false; });
      });
    });
  });

})();
