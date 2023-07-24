document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.main-content section');

  sections.forEach(function(section) {
    if (section.id !== 'home') {
      section.style.display = 'none';
    }
  });

  // Función para mostrar la sección específica
  function showSection(sectionName) {
    // Ocultar todas las secciones
    sections.forEach(function(section) {
      section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
      selectedSection.style.display = 'block';
    } else {
      // Si la sección seleccionada no existe, mostramos la sección "home" por defecto
      document.getElementById('home').style.display = 'block';
    }
  }

  // Obtener todos los enlaces del menú de navegación
  const links = document.querySelectorAll('ul.navbar a');

  // Añadir un evento clic a cada enlace
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      // Obtener la URL del enlace (por ejemplo, "#home")
      const href = link.getAttribute('href');
      // Mostrar la sección correspondiente
      showSection(href.substr(1).toLowerCase()); // Convertir a minúsculas
      // Cambiar la URL utilizando el API de Historial
      history.pushState(null, '', href);
    });
  });

  // Función para manejar el evento popstate (cambios en el historial del navegador)
  window.addEventListener('popstate', function() {
    // Mostrar la sección correspondiente basada en la URL actual
    showSection(window.location.hash.substr(1).toLowerCase()); // Convertir a minúsculas
  });

  // Mostrar la sección inicial basada en la URL actual
  showSection(window.location.hash.substr(1).toLowerCase()); // Convertir a minúsculas
});

function showCodesSection() {
  const codesContainer = document.getElementById('codes-container');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'sections/codes.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      codesContainer.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}
