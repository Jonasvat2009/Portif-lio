/* ============================================================
   config.js - configurações em um só lugar (fácil de trocar)
   ============================================================ */

const CONFIG = {
  // Chave usada no LocalStorage (o "nome da gaveta" onde guardamos o JSON)
  STORAGE_KEY: "canes_mensagens",

  // Senha do painel oculto (validação apenas visual, veja README).
  ADMIN_PASSWORD: "canes2026",

  // AUTOMAÇÃO (Etapa 2.2): endpoint do Formspree.
  // 1) Crie conta grátis em https://formspree.io  2) New Form  3) Copie a URL e cole abaixo.
  // Enquanto estiver com "SEU_ID", o envio de e-mail fica desativado
  // (a mensagem continua sendo salva no LocalStorage normalmente).
  FORMSPREE_URL: "https://formspree.io/f/SEU_ID"
};
