const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const compactLayout = window.matchMedia('(max-width: 70rem)');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.hidden = compactLayout.matches && !open;
}

function syncNavigation() {
  menuButton.hidden = !compactLayout.matches;
  setMenuOpen(false);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !compactLayout.matches) return;

  setMenuOpen(false);
  const destination = document.querySelector(link.hash);
  if (destination) {
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

compactLayout.addEventListener('change', syncNavigation);
syncNavigation();
