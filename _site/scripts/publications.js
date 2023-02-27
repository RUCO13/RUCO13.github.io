// ID de tu perfil de Google Scholar
const scholarID = 'd5ygTH8AAAAJ&hl';

// URL de la API de Google Scholar
const apiURL = `https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=google_scholar_author&query=select%20*%20from%20swdata%20where%20scholar_id%20%3D%20%27${scholarID}%27`;

// Función para obtener la lista de publicaciones y mostrarla en la página
function showPublications() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const publications = data.map(item => `
        <li>
          <a href="${item.url}" target="_blank">${item.title}</a>
          <br>
          <em>${item.authors}</em>
          <br>
          ${item.journal}, ${item.year}
        </li>
      `).join('');
      const ul = document.querySelector('#publications ul');
      ul.innerHTML = publications;
    })
    .catch(error => console.error(error));
}

// Mostrar la lista de publicaciones cuando la página está cargada
window.addEventListener('load', showPublications);
