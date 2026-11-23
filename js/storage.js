var CHAVE = CONFIG.STORAGE_KEY;

function listarMensagens() {
  var texto = localStorage.getItem(CHAVE);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function salvarLista(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

function buscarMensagem(id) {
  var lista = listarMensagens();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      return lista[i];
    }
  }
  return null;
}

function criarMensagem(nome, email, assunto, texto, enviado) {
  var lista = listarMensagens();

  var maior = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id > maior) {
      maior = lista[i].id;
    }
  }

  var nova = {
    id: maior + 1,
    data: new Date().toISOString(),
    nome: nome,
    email: email,
    assunto: assunto,
    mensagem: texto,
    enviado: enviado
  };

  lista.push(nova);
  salvarLista(lista);
  return nova;
}

function atualizarMensagem(id, nome, email, assunto, texto, enviado) {
  var lista = listarMensagens();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      lista[i].nome = nome;
      lista[i].email = email;
      lista[i].assunto = assunto;
      lista[i].mensagem = texto;
      lista[i].enviado = enviado;
    }
  }
  salvarLista(lista);
}

function deletarMensagem(id) {
  var lista = listarMensagens();
  var nova = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== id) {
      nova.push(lista[i]);
    }
  }
  salvarLista(nova);
}

function gerarExemplos() {
  var nomes = ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Alves", "Elisa Rocha"];
  var emails = ["ana@exemplo.com", "bruno@exemplo.com", "carla@exemplo.com", "diego@exemplo.com", "elisa@exemplo.com"];
  var assuntos = ["Proposta de estágio", "Dúvida sobre projeto", "Convite para entrevista", "Parceria"];
  var lista = [];

  for (var i = 1; i <= 20; i++) {
    lista.push({
      id: i,
      data: new Date().toISOString(),
      nome: nomes[i % 5],
      email: emails[i % 5],
      assunto: assuntos[i % 4],
      mensagem: "Mensagem de teste número " + i + ". Gostei muito do seu portfólio!",
      enviado: false
    });
  }
  return lista;
}

if (localStorage.getItem(CHAVE) === null) {
  salvarLista(gerarExemplos());
}

function escapeHTML(texto) {
  texto = String(texto);
  texto = texto.replace(/&/g, "&amp;");
  texto = texto.replace(/</g, "&lt;");
  texto = texto.replace(/>/g, "&gt;");
  texto = texto.replace(/"/g, "&quot;");
  return texto;
}
