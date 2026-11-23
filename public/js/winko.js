/* Winko · scripts du prototype.
   En Webflow : à coller dans Site settings > Custom code (avant </body>)
   ou à remplacer par des Webflow Interactions quand c'est possible. */
(function () {
  // Active les animations CSS (bandeaux) : sans script, comme dans le Designer Webflow, tout reste figé.
  document.documentElement.classList.add('js-ready');
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

  // Compte à rebours (LP événement) : badge « J-xx » depuis data-countdown (AAAA-MM-JJ, ou date du champ CMS Webflow).
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    var v = el.getAttribute('data-countdown') || '';
    var target = new Date(/^\d{4}-\d{2}-\d{2}$/.test(v) ? v + 'T00:00:00' : v); target.setHours(0, 0, 0, 0);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var days = Math.round((target - today) / 86400000);
    if (isNaN(days) || days <= 0) { (el.closest('[data-countdown-box]') || el).hidden = true; return; }
    el.textContent = 'J-' + days;
  });

  // Popups : « Télécharger l'app » (QR code, desktop uniquement ; mobile = lien intelligent vers le store)
  // et « Entretien personnalisé » (formulaire, desktop et mobile). Fermeture : [data-modal-close] ou Échap.
  var setupModal = function (modal, triggers, desktopOnly) {
    if (!modal) return;
    var lastFocus = null;
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    var open = function (e) {
      if (desktopOnly && isMobile()) return;
      e.preventDefault();
      lastFocus = document.activeElement;
      modal.hidden = false;
      modal.classList.add('is-open');
      var first = modal.querySelector('input, [data-modal-close], [data-app-modal-close]');
      if (first) first.focus();
      document.addEventListener('keydown', onKey);
    };
    var close = function (e) {
      if (e && e.preventDefault) e.preventDefault(); // le bouton Fermer peut être un lien href="#" (Webflow)
      modal.classList.remove('is-open');
      modal.hidden = true;
      document.removeEventListener('keydown', onKey);
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll(triggers).forEach(function (btn) { btn.addEventListener('click', open); });
    modal.querySelectorAll('[data-modal-close], [data-app-modal-close]').forEach(function (btn) { btn.addEventListener('click', close); });
  };
  setupModal(document.querySelector('[data-app-modal]'), '[data-app-modal-open], a[href*="winko.io/app"]', true);
  setupModal(document.querySelector('[data-form-modal]'), '[data-form-modal-open]', false);

  // Séquence d'images au scroll (panneau 3D du hero d'accueil, effet repris de winko.io).
  // L'image porte data-sequence-sprite (une ou plusieurs planches WebP séparées par des espaces, images en grille,
  // réparties à parts égales), data-sequence-frames (total) et data-sequence-cols (colonnes par planche).
  // Progression : de la position au chargement jusqu'à la sortie complète de la section (formule de winko.io,
  // étalée jusqu'au bout pour un rythme comparable). Affiche seule si l'utilisateur limite les animations.
  document.querySelectorAll('img[data-sequence-sprite]').forEach(function (img) {
    var srcs = (img.getAttribute('data-sequence-sprite') || '').split(/[\s,]+/).filter(Boolean);
    var frames = parseInt(img.getAttribute('data-sequence-frames'), 10);
    var cols = parseInt(img.getAttribute('data-sequence-cols'), 10);
    if (!srcs.length || !frames || !cols || reduceMotion) return;
    var wrapper = img.parentElement;
    var section = img.closest('section') || wrapper;
    var perSheet = Math.ceil(frames / srcs.length);
    var sheets = srcs.map(function (src) { var im = new Image(); im.decoding = 'async'; im.src = src; return im; });
    var canvas = null, ctx = null, start = null, current = -1, ticking = false;
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      current = -1;
    };
    var draw = function () {
      ticking = false;
      var vh = window.innerHeight, r = section.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      if (start === null) start = Math.min(progress, 0.95);
      var seek = Math.min(1, Math.max(0, (progress - start) / (1 - start)));
      var frame = Math.round(seek * (frames - 1));
      var sheet = sheets[Math.floor(frame / perSheet)];
      if (frame === current || !sheet.complete || !sheet.naturalWidth) return; // planche pas encore chargée : on garde l'image affichée
      current = frame;
      var i = frame % perSheet;
      var inSheet = Math.min(perSheet, frames - Math.floor(frame / perSheet) * perSheet); // la dernière planche peut être incomplète
      var fw = sheet.naturalWidth / cols, fh = sheet.naturalHeight / Math.ceil(inSheet / cols);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(sheet, (i % cols) * fw, Math.floor(i / cols) * fh, fw, fh, 0, 0, canvas.width, canvas.height);
    };
    sheets.forEach(function (im) { im.addEventListener('load', function () { if (canvas) { current = -1; draw(); } }); });
    sheets[0].addEventListener('load', function () {
      canvas = document.createElement('canvas');
      canvas.className = 'hero_sequence';
      canvas.setAttribute('aria-hidden', 'true');
      wrapper.appendChild(canvas);
      ctx = canvas.getContext('2d');
      size(); draw();
      wrapper.classList.add('is-sequence');
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }, { passive: true });
      window.addEventListener('resize', function () { size(); draw(); });
    });
  });

  if (reduceMotion) document.documentElement.classList.add('reduce-motion');
})();
