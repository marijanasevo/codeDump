const triggers = document.querySelectorAll('.list-container > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('nav');

function handleHover() {
  this.classList.add('trigger-enter');
  
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();

  const coords = {
    left: dropdownCoords.left,
    top: dropdownCoords.top - nav.offsetTop,
    width: dropdownCoords.width - nav.offsetLeft,
    height: dropdownCoords.height
  };

  background.style.left = coords.left + 'px';
  background.style.top = coords.top + 'px';
  background.style.width = coords.width + 'px';
  background.style.height = coords.height + 'px';
}

function handleUnhover() {
  this.classList.remove('trigger-enter');
  setTimeout(() => this.classList.remove('trigger-enter-active'), 150);
  background.classList.remove('open');
}


triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleHover));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleUnhover));