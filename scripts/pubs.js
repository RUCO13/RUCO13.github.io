fetch('data/ruco-papers.bib')
  .then(response => response.text())
  .then(data => {
    const entries = data.split('\n\n');
    const citationsContainer = document.getElementById('citations');
    let counter = 1; // Contador para los puntos

    entries.reverse().forEach(entry => {
      const citation = parseBibEntry(entry);
      const formattedAuthors = formatAuthors(citation.author);
      const formattedTitle = replaceLaTeXAccents(citation.title);
      const publicationLink = citation.url;
      const publicationIcon = `<i class="fas fa-external-link-alt custom-icon"></i>`;

      const citationHTML = `
        <p>
          <span class="point">${counter}.</span>
          <span class="title"><strong><em>${formattedTitle}</em></strong></span><br>
          ${formattedAuthors}. (${citation.year}) ${citation.publisher} 
          <a href="${publicationLink}" target="_blank">${publicationIcon}</a>
        </p>
      `;

      const citationElement = document.createElement('div');
      citationElement.innerHTML = citationHTML;
      citationsContainer.appendChild(citationElement);

      counter++; // Incrementar el contador de puntos
    });
  });

function parseBibEntry(entry) {
  const citation = {};
  entry.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      citation[key.trim()] = value.trim().replace(/[{}]/g, '');
    }
  });
  return citation;
}

function formatAuthors(authors) {
  const authorList = authors.split(' and ');
  const formattedAuthors = authorList.map(author => {
    const names = author.trim().split(', ');
    if (names.length > 1) {
      // Los nombres tienen apellidos y nombres, separar con coma
      return `${names[0]}, ${names.slice(1).join(' ')}`;
    } else {
      // Solo hay un nombre, no hacer nada
      return author.trim();
    }
  }).join(', ');

  return formattedAuthors;
}

function replaceLaTeXAccents(text) {
  const accentDictionary = {
    "\\'a": "á",
    "\\'e": "é",
    "\\'i": "í",
    "\\'o": "ó",
    "\\'u": "ú",
    "\\'A": "Á",
    "\\'E": "É",
    "\\'I": "Í",
    "\\'O": "Ó",
    "\\'U": "Ú"
  };

  const regex = /\\'(a|e|i|o|u|A|E|I|O|U)/g;

  return text.replace(regex, match => accentDictionary[match]);
}
