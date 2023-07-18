document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.main-content section');
  
    sections.forEach(function(section) {
      if (section.id !== 'home') {
        section.style.display = 'none';
      }
    });
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
  