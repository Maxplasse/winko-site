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

  // Vidéo pilotée par le scroll (panneau 3D du hero d'accueil, effet repris de winko.io).
  // L'image (affiche) porte data-sequence-video : URL d'un MP4 sur fond blanc, à images clés rapprochées.
  // Progression : de la position au chargement jusqu'à la sortie complète de la section (le panneau reste à l'écran
  // grâce au sticky CSS), avec inertie. Un seul déplacement de lecture à la fois : pas d'à-coups en scroll rapide.
  // Affiche seule si l'utilisateur limite les animations.
  document.querySelectorAll('img[data-sequence-video]').forEach(function (img) {
    var src = img.getAttribute('data-sequence-video');
    if (!src || reduceMotion) return;
    var wrapper = img.parentElement;
    var section = img.closest('section') || wrapper;
    var video = document.createElement('video');
    video.className = 'hero_sequence';
    video.muted = true; video.playsInline = true; video.preload = 'auto';
    video.setAttribute('muted', ''); video.setAttribute('playsinline', ''); video.setAttribute('aria-hidden', 'true');
    var start = null, target = 0, shown = 0, ticking = false, ready = false, easing = false;
    // Inertie (comme le scroll amorti de winko.io) : la position affichée rattrape la cible de 12 % par image.
    var seekTo = function () {
      if (!ready || video.seeking) return;
      if (Math.abs(video.currentTime - shown) > 0.01) video.currentTime = shown;
    };
    var ease = function () {
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.005) shown = target;
      seekTo();
      if (shown !== target) requestAnimationFrame(ease); else easing = false;
    };
    var update = function () {
      ticking = false;
      var vh = window.innerHeight, r = section.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      if (start === null) start = Math.min(progress, 0.95);
      var seek = Math.min(1, Math.max(0, (progress - start) / (1 - start)));
      target = seek * Math.max(0, (video.duration || 0) - 0.05);
      if (!easing) { easing = true; requestAnimationFrame(ease); }
    };
    video.addEventListener('seeked', seekTo);
    video.addEventListener('loadeddata', function () {
      ready = true;
      wrapper.classList.add('is-sequence');
      update();
    }, { once: true });
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    video.src = src;
    wrapper.appendChild(video);
    // iOS : une lecture furtive autorise l'affichage des images lors des déplacements de lecture.
    var primed = video.play();
    if (primed && primed.then) primed.then(function () { video.pause(); update(); }).catch(function () {});
  });

  if (reduceMotion) document.documentElement.classList.add('reduce-motion');
})();
