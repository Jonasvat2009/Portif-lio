/* ============================================================
   contact.js - formulário de contato
   Quando o visitante clica em "Enviar":
     1) o navegador confere os campos "required"
     2) salvamos a mensagem no LocalStorage
     3) mandamos o e-mail pelo Formspree (automação)
     4) mostramos um aviso na tela
   ============================================================ */

var form = document.getElementById("formContato");
var retorno = document.getElementById("retornoForm");

function mostrarAviso(tipo, texto) {
  retorno.innerHTML = '<div class="alert alert-' + tipo + ' mb-0">' + texto + "</div>";
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();   // não deixa a página recarregar

  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var assunto = document.getElementById("assunto").value;
  var mensagem = document.getElementById("mensagem").value;

  // PASSO 2: salva no LocalStorage (enviado = false por enquanto)
  var registro = criarMensagem(nome, email, assunto, mensagem, false);

  form.reset();   // limpa o formulário

  // Se a URL do Formspree ainda não foi configurada, só avisa
  if (CONFIG.FORMSPREE_URL.indexOf("SEU_ID") !== -1) {
    mostrarAviso("warning", "Mensagem salva localmente. O envio por e-mail ainda não foi configurado (veja js/config.js).");
    return;
  }

  // PASSO 3: envia para o Formspree
  var dados = {
    name: nome,
    email: email,
    _subject: "[Portfólio] " + assunto,
    message: mensagem
  };

  fetch(CONFIG.FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(dados)
  })
    .then(function (resposta) {
      if (resposta.ok) {
        // deu certo: marca a mensagem como enviada
        atualizarMensagem(registro.id, nome, email, assunto, mensagem, true);
        mostrarAviso("success", "Mensagem enviada com sucesso! Obrigado pelo contato.");
      } else {
        mostrarAviso("warning", "Mensagem salva localmente, mas o e-mail não foi enviado.");
      }
    })
    .catch(function () {
      mostrarAviso("warning", "Mensagem salva localmente, mas o e-mail não foi enviado (sem conexão?).");
    });
});
