# Portfólio Web Dinâmico — Processo Seletivo Canes Solution

Portfólio de desenvolvedor Frontend feito **do zero** (sem construtores de site), com **HTML5, CSS3, JavaScript e Bootstrap 5**, responsivo (Mobile First), com CRUD em **LocalStorage** e envio automático do formulário por e-mail.

## Seções
Apresentação · Áreas do Conhecimento (4) · Tendências Tecnológicas (4) · Galeria de Projetos · Contato

## Estrutura
```
index.html          # página única com todas as seções + painel admin oculto
css/style.css       # estilos (Mobile First)
js/config.js        # senha do admin e URL da automação
js/storage.js       # CRUD no LocalStorage + injeção de 20 registros
js/projects.js      # lista de projetos (gera os cards da galeria)
js/contact.js       # formulário: salva local e dispara e-mail
js/admin.js         # painel administrativo oculto
assets/img/         # foto e screenshots
```

## Como executar
Basta abrir o `index.html` no navegador (ou usar a extensão *Live Server* do VS Code). Não precisa de instalação nem de servidor.

---

## 1. Escolha da ferramenta de automação (Etapa 2.2)

**Ferramenta escolhida: [Formspree](https://formspree.io)** (Form-to-Email via API REST).

**Por que o Formspree?**
| Critério | Formspree | Alternativas (EmailJS, n8n, Make) |
|---|---|---|
| Configuração | 1 formulário + 1 URL, sem código de backend | EmailJS exige templates e chaves; n8n/Make exigem montar um fluxo e (n8n) hospedar |
| Segurança | A URL do endpoint é pública por design; não expõe senha SMTP nem chave privada | Chaves de serviço no front-end ficam visíveis |
| Integração | Um único `fetch` com `POST` em JSON | Mais passos de integração |
| Custo | Plano gratuito (50 envios/mês) suficiente para um portfólio | Variável |
| Recursos extras | Proteção anti-spam e painel com histórico de submissões | — |

**Como funciona o fluxo:** o JavaScript (`js/contact.js`) valida o formulário → salva no LocalStorage → faz `fetch` POST no endpoint do Formspree → o Formspree envia o e-mail para a minha caixa de entrada. O resultado (`enviado: true/false`) é gravado no registro e exibido no painel admin.

**Como configurar (para o avaliador/colega que clonar o projeto):**
1. Criar conta gratuita no Formspree e clicar em *New Form* (informar o e-mail que receberá as mensagens).
2. Copiar o endpoint (`https://formspree.io/f/xxxxxxx`).
3. Colar em `js/config.js`, na propriedade `FORMSPREE_URL`.
4. Enviar uma mensagem de teste (na primeira vez o Formspree pede a confirmação do e-mail).

> Se `FORMSPREE_URL` não estiver configurada, o formulário continua salvando no LocalStorage e avisa que o e-mail não foi enviado.

---

## 2. Como acessar a área administrativa oculta e testar o CRUD

O painel não aparece no menu. Há **3 formas de abrir** (qualquer uma pede senha):

1. Acessar a URL com `#admin`: `index.html#admin`
2. Clicar **5 vezes rápido** no texto de copyright do rodapé
3. Atalho de teclado **Ctrl + Shift + A**

**Senha:** `canes2026` (definida em `js/config.js`)

### Roteiro de teste do CRUD
| Operação | Como testar |
|---|---|
| **Read** | Ao abrir, a tabela lista as mensagens. Use a busca por nome/e-mail/assunto. |
| **Create** | Botão **+ Nova mensagem**, ou envie pelo formulário de contato da página. |
| **Update** | Botão **Editar** em uma linha → alterar → **Salvar**. |
| **Delete** | Botão **Excluir** (pede confirmação). Há também **Apagar tudo**. |
| **Seed (20 registros)** | No primeiro acesso, se o LocalStorage estiver vazio, o sistema injeta 20 mensagens de teste automaticamente. Para ver isso de novo: DevTools (F12) → Application → Local Storage → apagar a chave `canes_mensagens` → recarregar. Ou use **Restaurar 20 exemplos**. |

Os dados ficam em formato **JSON** na chave `canes_mensagens` do LocalStorage (visível no DevTools).

### Observação de segurança
Como o projeto é 100% front-end, a senha do painel fica no código-fonte; ela serve para **ocultar** a área, não para proteger dados sensíveis. Em um sistema real a autenticação seria feita no servidor. Todo texto digitado é escapado (`escapeHTML`) antes de ir ao HTML, evitando ataques XSS.

---

## Responsividade
Mobile First: o CSS base é para celular e `@media (min-width)` amplia para tablet (768px) e desktop (992px). Usa o grid do Bootstrap (`row`, `col-*`, `row-cols-*`), navbar com menu hambúrguer, Flexbox (cards) e `table-responsive`.

## Autor
Seu Nome — Curso Técnico em Desenvolvimento de Sistemas
