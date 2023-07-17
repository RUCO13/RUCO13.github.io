document.addEventListener('DOMContentLoaded', function() {
    const navbarLinks = document.querySelectorAll('ul.navbar li a');
    const sections = document.querySelectorAll('.main-content section');
  
    navbarLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
  
        const targetId = this.getAttribute('href');
  
        sections.forEach(function(section) {
          section.style.display = 'none';
        });
  
        const targetSection = document.querySelector(targetId);
        targetSection.style.display = 'block';
      });
    });
  });
  