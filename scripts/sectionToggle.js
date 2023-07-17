// Aquí puedes colocar cualquier otra funcionalidad relacionada con el cambio de secciones

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.main-content section');
  
    sections.forEach(function(section) {
      if (section.id !== 'home') {
        section.style.display = 'none';
      }
    });
  });