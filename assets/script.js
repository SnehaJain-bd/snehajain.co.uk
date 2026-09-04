/* =========================================================
   Sneha Jain, snehajain.co.uk
   Progressive enhancement only. Every page reads fine
   with JavaScript switched off.
   ========================================================= */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Southampton clock ----------
     Shows Sneha's local time, not the visitor's, so the
     "available for work" line next to it means something. */
  var clock = document.getElementById('clock');

  function tick() {
    if (!clock) return;
    var now = new Date();
    try {
      clock.textContent = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      /* Browser without full Intl time zone data. Fall back to local time. */
      clock.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    }
  }
  if (clock) {
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var head = document.querySelector('.site-head');

  function setHeadHeight() {
    if (!head) return;
    document.documentElement.style.setProperty(
      '--head-h', Math.round(head.getBoundingClientRect().bottom) + 'px'
    );
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

  /* ---------- Tally embed ----------
     The form is Tally's. This only swaps data-tally-src onto src and
     lets Tally size the frame to its content. Nothing loads on pages
     that have no Tally iframe. */
  var tallyFrames = document.querySelectorAll('iframe[data-tally-src]');
  if (tallyFrames.length) {
    var tallySrc = 'https://tally.so/widgets/embed.js';
    var loadTally = function () {
      if (typeof Tally !== 'undefined') { Tally.loadEmbeds(); return; }
      /* Script blocked or failed. Point the frames at the form directly
         so people still get something they can fill in. */
      Array.prototype.forEach.call(tallyFrames, function (f) {
        if (!f.getAttribute('src')) f.setAttribute('src', f.dataset.tallySrc);
      });
    };
    if (typeof Tally !== 'undefined') {
      loadTally();
    } else if (!document.querySelector('script[src="' + tallySrc + '"]')) {
      var ts = document.createElement('script');
      ts.src = tallySrc;
      ts.onload = loadTally;
      ts.onerror = loadTally;
      document.body.appendChild(ts);
    }
  }

  /* ---------- FAQ: one open answer per column ---------- */
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
