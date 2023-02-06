const divs = document.querySelectorAll('div');

function logTarget(e) {
  console.log(this.classList.value); 
  // bubbling: three two one
  // capturing: one two three

  e.stopPropagation();
  // capturing: one
}

divs.forEach(div => div.addEventListener('click', logTarget, 
  {
    capture: true, 
    // once: true
  }
));