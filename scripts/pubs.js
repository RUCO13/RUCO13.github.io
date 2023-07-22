fetch('data/ruco-papers.bib') 
 .then(response => response.text())
 .then(data => {
   const entries = data.split('\n\n');
   const citationsContainer = document.getElementById('citations');
   let counter = 1; // Contador para los puntos

   entries.reverse().forEach(entry => {
     const citation = {};

     entry.split('\n').forEach(line => {
       const [key, value] = line.split('=');
       if (key && value) {
         citation[key.trim()] = value.trim().replace(/[{}]/g, '');
       }
     });

     const authors = citation.author.split(' and ');
     const formattedAuthors = authors.map(author => {
       if ((author.trim() === 'Ruiz-Cigarrillo, O') || (author.trim() === 'Ruiz-Cigarrillo, Oscar') ||(author.trim() === 'Ruiz-Cigarrillo, O.')) {
         return `<span class="author">${author}</span>`;
       } else {
         return replaceLaTeXAccents(author);
       }
     }).join(', ');

     const title = citation.title;
     const formattedTitle = replaceLaTeXAccents(title);

     const publicationLink = citation.url;
     const publicationIcon = `<i class="fas fa-external-link-alt custom-icon"></i>`;


     const citationHTML = `<p><span class="point">${counter}.</span> ${formattedAuthors}. (${citation.year}). <span class="title">${formattedTitle}</span>. ${citation.publisher} <a href="${publicationLink}" target="_blank">${publicationIcon}</a></p>`;
     citationsContainer.innerHTML += citationHTML;

     counter++; // Incrementar el contador de puntos
   });
 });

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


