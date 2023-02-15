'use strict';

const body = document.body;
const featured = document.querySelector('.featured');
const menuBtn = document.querySelector('.nav__menu-button');
const menuList = document.querySelector('.nav__menu');

let darkOverlay = document.createElement('div');
darkOverlay.className = 'dark-overlay';

let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';

function toggleMenu() {
  // if menu is open
  menuBtn?.classList.toggle('open-menu');
  // prevent scrolling
  body.classList.toggle('stop-scrolling');

  if (menuBtn?.classList.contains('open-menu')) {
    // When scroll is removed, prevent content from jumping
    // to fill in the space
    featured.style.marginRight = scrollbarWidth;
    // and add dark overlay behind the menu
    body.append(darkOverlay);
  } else {
    featured.style.marginRight = '';
    // otherwise remove margin and overlay
    darkOverlay.remove();
  }
}

function toggleMobileClass() {
  if (window.innerWidth <= 599) {
    menuList?.classList.add('mobile-menu');
  } else {
    menuList?.classList.remove('mobile-menu');
  }
}

toggleMobileClass();
menuBtn.addEventListener('click', toggleMenu);
darkOverlay.addEventListener('click', toggleMenu);
window.addEventListener('resize', toggleMobileClass);