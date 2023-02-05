const nav = document.getElementById('main');
const logo = document.querySelector('.logo');

const navPosition = nav.offsetTop;

function stickNav() {
  if (window.scrollY > navPosition) {
    document.body.classList.add('fixed-nav');
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = '';
  }
}

window.addEventListener('scroll', stickNav);