var painel = document.getElementById("painelAdmin");
var areaLogin = document.getElementById("areaLogin");
var areaAdmin = document.getElementById("areaAdmin");
var tabela = document.getElementById("tabelaMensagens");
var logado = false;


function abrirPainel() {
  painel.classList.remove("d-none");
  document.body.style.overflow = "hidden";

  if (logado) {
    areaLogin.classList.add("d-none");
    areaAdmin.classList.remove("d-none");
    mostrarTabela();
  } else {
    areaLogin.classList.remove("d-none");
    areaAdmin.classList.add("d-none");
  }
}

function fecharPainel() {
  painel.classList.add("d-none");
  document.body.style.overflow = "";
}

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  var senha = document.getElementById("senhaAdmin").value;

  if (senha === CONFIG.ADMIN_PASSWORD) {
    logado = true;
    document.getElementById("erroLogin").classList.add("d-none");
    document.getElementById("senhaAdmin").value = "";
    abrirPainel();
  } else {
    document.getElementById("erroLogin").classList.remove("d-none");
  }
});

function mostrarTabela() {
  var busca = document.getElementById("buscaAdmin").value.toLowerCase();
  var lista = listarMensagens();
  var html = "";
  var total = 0;

  for (var i = lista.length - 1; i >= 0; i--) {
    var m = lista[i];
    var texto = (m.nome + " " + m.email + " " + m.assunto).toLowerCase();

    if (texto.indexOf(busca) === -1) {
      continue;
    }
    total++;

    html += "<tr>";
    html += "<td>" + m.id + "</td>";
    html += "<td>" + new Date(m.data).toLocaleString("pt-BR") + "</td>";
    html += "<td>" + escapeHTML(m.nome) + "</td>";
    html += "<td>" + escapeHTML(m.email) + "</td>";
    html += "<td>" + escapeHTML(m.assunto) + "</td>";
    html += '<td class="msg">' + escapeHTML(m.mensagem) + "</td>";
    html += "<td>" + (m.enviado ? "Sim" : "Não") + "</td>";
    html += '<td class="text-nowrap">';
    html += '<button class="btn btn-sm btn-primary" onclick="editarMensagem(' + m.id + ')">Editar</button> ';
    html += '<button class="btn btn-sm btn-danger" onclick="excluirMensagem(' + m.id + ')">Excluir</button>';
    html += "</td>";
    html += "</tr>";
  }

  if (html === "") {
    html = '<tr><td colspan="8" class="text-center">Nenhuma mensagem encontrada.</td></tr>';
  }

  tabela.innerHTML = html;
  document.getElementById("contadorAdmin").textContent = total + " de " + lista.length + " mensagens";
}

function novaMensagem() {
  document.getElementById("tituloForm").textContent = "Nova mensagem";
  document.getElementById("msgId").value = "";
  document.getElementById("formMensagem").reset();
  document.getElementById("cardForm").classList.remove("d-none");
}

function editarMensagem(id) {
  var m = buscarMensagem(id);
  document.getElementById("tituloForm").textContent = "Editar mensagem #" + id;
  document.getElementById("msgId").value = id;
  document.getElementById("msgNome").value = m.nome;
  document.getElementById("msgEmail").value = m.email;
  document.getElementById("msgAssunto").value = m.assunto;
  document.getElementById("msgTexto").value = m.mensagem;
  document.getElementById("cardForm").classList.remove("d-none");
}

function cancelarForm() {
  document.getElementById("cardForm").classList.add("d-none");
}

document.getElementById("formMensagem").addEventListener("submit", function (e) {
  e.preventDefault();

  var id = document.getElementById("msgId").value;
  var nome = document.getElementById("msgNome").value;
  var email = document.getElementById("msgEmail").value;
  var assunto = document.getElementById("msgAssunto").value;
  var texto = document.getElementById("msgTexto").value;

  if (id === "") {
    criarMensagem(nome, email, assunto, texto, false);
  } else {
    var antiga = buscarMensagem(Number(id));
    atualizarMensagem(Number(id), nome, email, assunto, texto, antiga.enviado);
  }

  cancelarForm();
  mostrarTabela();
});

function excluirMensagem(id) {
  if (confirm("Excluir a mensagem #" + id + "?")) {
    deletarMensagem(id);
    mostrarTabela();
  }
}

function restaurarExemplos() {
  if (confirm("Substituir TODAS as mensagens pelos 20 exemplos?")) {
    salvarLista(gerarExemplos());
    mostrarTabela();
  }
}

function apagarTudo() {
  if (confirm("Apagar TODAS as mensagens?")) {
    salvarLista([]);
    mostrarTabela();
  }
}

if (location.hash === "#admin") {
  abrirPainel();
}
window.addEventListener("hashchange", function () {
  if (location.hash === "#admin") {
    abrirPainel();
  }
});

var cliques = 0;
document.getElementById("gatilhoAdmin").addEventListener("click", function () {
  cliques++;
  if (cliques === 5) {
    cliques = 0;
    abrirPainel();
  }
  setTimeout(function () { cliques = 0; }, 3000);
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    abrirPainel();
  }
});
