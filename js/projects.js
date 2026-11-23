var PROJETOS = [
  {
    titulo: "Projeto 1 - Aula 1",
    descricao: "Introdução a base do HTML5 nas aulas de TI",
    imagem: "https://i.imgur.com/gYHkTqB.png",
    tecnologias: ["HTML5"],
    repo: "https://github.com/Jonasvat2009/Aula-1"
  },
  {
    titulo: "Projeto 2 - Aula 2",
    descricao: "Introdução do CSS",
    imagem: "https://i.imgur.com/7S1ghY7.png",
    tecnologias: ["HTML5, CSS"],
    repo: "https://github.com/Jonasvat2009/Aula-2"
  },
  {
    titulo: "Projeto 3 - Aula 3",
    descricao: "Aprofundamento do HTML5 e CSS",
    imagem: "https://i.imgur.com/8gCr4Hv.png",
    tecnologias: ["HTML5, CSS"],
    repo: "https://github.com/Jonasvat2009/Aula-3"
  }
];

var galeria = document.getElementById("galeria");
var html = "";

for (var i = 0; i < PROJETOS.length; i++) {
  var p = PROJETOS[i];

  var badges = "";
  for (var j = 0; j < p.tecnologias.length; j++) {
    badges += '<span class="badge text-bg-secondary">' + p.tecnologias[j] + "</span> ";
  }

  html += '<div class="col">';
  html += '  <div class="card h-100 shadow-sm projeto-card">';
  html += '    <img src="' + p.imagem + '" class="card-img-top" alt="Screenshot do projeto">';
  html += '    <div class="card-body">';
  html += '      <h3 class="h5 card-title">' + p.titulo + "</h3>";
  html += '      <p class="card-text">' + p.descricao + "</p>";
  html += '      <div class="mb-3">' + badges + "</div>";
  html += '      <a href="' + p.repo + '" target="_blank" class="btn btn-outline-brand">Ver repositório</a>';
  html += "    </div>";
  html += "  </div>";
  html += "</div>";
}

galeria.innerHTML = html;
