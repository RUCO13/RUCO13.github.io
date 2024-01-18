const electron = document.querySelector('.electron');

electron.addEventListener('click', () => {
  electron.classList.add('animate');
});

electron.addEventListener('animationend', () => {
  electron.classList.remove('animate');
});
