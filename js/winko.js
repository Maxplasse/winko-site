/* Winko · scripts du prototype.
   En Webflow : à coller dans Site settings > Custom code (avant </body>)
   ou à remplacer par des Webflow Interactions quand c'est possible. */
(function () {
  // Marquee : duplique le contenu de la piste pour une boucle infinie (-50 %).
  document.querySelectorAll('[data-marquee] .marquee_track').forEach(function (track) {
    Array.from(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

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
})();
