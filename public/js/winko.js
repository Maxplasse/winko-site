/* Winko · scripts du prototype.
   En Webflow : à coller dans Site settings > Custom code (avant </body>)
   ou à remplacer par des Webflow Interactions quand c'est possible. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Les bandeaux défilants (logos, témoignages, mots) sont 100 % CSS : voir .marquee dans winko.css.

  var isMobile = function () { return window.matchMedia('(max-width: 767px)').matches; };

  // Lien intelligent « Télécharger l'app » : sur mobile, mène directement au bon store
  // (data-ios-url / data-android-url) ; sinon au lien de repli (href).
  var ua = navigator.userAgent || '';
  var platform = /iPhone|iPad|iPod/i.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : null;
  if (platform) {
    document.querySelectorAll('[data-app-link], a[href*="winko.io/app"]').forEach(function (link) {
      var store = link.getAttribute('data-' + platform + '-url');
      if (store) link.setAttribute('href', store);
    });
  }

  // Contact : écrans de choix. Le choix (ou l'ancre #recruter / #mission) affiche le panneau correspondant.
  var choice = document.querySelector('[data-contact-choice]');
  if (choice) {
    var options = choice.querySelectorAll('[data-contact-option]');
    var panels = document.querySelectorAll('[data-contact-panel]');
    var show = function (key, scroll) {
      var found = false;
      panels.forEach(function (p) {
        var match = p.getAttribute('data-contact-panel') === key;
        p.hidden = !match;
        if (match) found = true;
      });
      if (!found) key = null;
      choice.classList.toggle('is-alone', !key);
      options.forEach(function (o) {
        var active = o.getAttribute('data-contact-option') === key;
        o.classList.toggle('is-active', active);
        o.classList.toggle('is-muted', !!key && !active);
        if (active) o.setAttribute('aria-current', 'true'); else o.removeAttribute('aria-current');
      });
      if (key && scroll) document.getElementById(key).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };
    options.forEach(function (o) {
      o.addEventListener('click', function (e) {
        e.preventDefault();
        var key = o.getAttribute('data-contact-option');
        history.replaceState(null, '', '#' + key);
        show(key, true);
      });
    });
    show(location.hash.slice(1), false);
    window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
  }

  // Menu mobile (en Webflow : composant Navbar natif).
  var navbar = document.querySelector('[data-navbar]');
  var toggle = document.querySelector('[data-navbar-toggle]');
  if (navbar && toggle) {
    toggle.addEventListener('click', function () {
      var open = navbar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  // FAQ : accordéon, une seule question ouverte à la fois.
  document.querySelectorAll('[data-faq]').forEach(function (faq) {
    var items = faq.querySelectorAll('.faq_item');
    items.forEach(function (item) {
      var button = item.querySelector('.faq_question');
      button.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq_question').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // Widget sticky : visible après 600 px de scroll, masqué quand le footer arrive.
  var widget = document.querySelector('[data-sticky-widget]');
  if (widget) {
    var footer = document.querySelector('footer');
    var footerVisible = false;
    var update = function () {
      widget.classList.toggle('is-visible', window.scrollY > 600 && !footerVisible);
    };
    if (footer && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        footerVisible = entries[0].isIntersecting;
        update();
      }).observe(footer);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Compte à rebours (LP événement) : badge « J-xx » depuis data-countdown="AAAA-MM-JJ".
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    var target = new Date(el.getAttribute('data-countdown') + 'T00:00:00');
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var days = Math.round((target - today) / 86400000);
    if (isNaN(days) || days <= 0) { (el.closest('[data-countdown-box]') || el).hidden = true; return; }
    el.textContent = 'J-' + days;
  });

  // Modale « Télécharger l'app » (QR code).
  var modal = document.querySelector('[data-app-modal]');
  if (modal) {
    var lastFocus = null;
    var open = function (e) {
      if (isMobile()) return; // mobile : lien intelligent vers le store
      e.preventDefault();
      lastFocus = document.activeElement;
      modal.hidden = false;
      modal.querySelector('[data-app-modal-close]').focus();
      document.addEventListener('keydown', onKey);
    };
    var close = function () {
      modal.hidden = true;
      document.removeEventListener('keydown', onKey);
      if (lastFocus) lastFocus.focus();
    };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    document.querySelectorAll('[data-app-modal-open], a[href*="winko.io/app"]').forEach(function (btn) { btn.addEventListener('click', open); });
    modal.querySelectorAll('[data-app-modal-close]').forEach(function (btn) { btn.addEventListener('click', close); });
  }

  if (reduceMotion) document.documentElement.classList.add('reduce-motion');
})();
