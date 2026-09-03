import type { Bi } from "../lib/i18n";

/** Um lugar só para o que muda quando o estúdio muda. */
export const SITE = {
  email: "joaopedroteixeirareis@gmail.com",
  github: "https://github.com/JTeixeiraz",
  ano: 2026,
};

const b = (en: string, pt: string): Bi => ({ en, pt });

export const T = {
  nav: {
    produtos: b("Products", "Produtos"),
    estudio: b("Studio", "Estúdio"),
    metodo: b("How we build", "Como construímos"),
    contato: b("Contact", "Contato"),
    pular: b("Skip to content", "Pular para o conteúdo"),
  },

  hero: {
    meta: b("Independent software studio · Brazil", "Estúdio de software independente · Brasil"),
    titulo: b("Software gets built here.", "É aqui que o software é feito."),
    lead: b(
      "VYRO owns what it builds. Three products are in people's hands right now: a management system for bird breeders, a self-care app shipped in nine languages, and a marketing department that runs offline on your own machine.",
      "A VYRO é dona do que constrói. Três produtos já estão na mão das pessoas: um sistema de gestão para criadores de aves, um app de self-care publicado em nove idiomas, e um departamento de marketing que roda offline na sua própria máquina.",
    ),
    verProdutos: b("See the products", "Ver os produtos"),
    falar: b("Start a conversation", "Começar uma conversa"),
  },

  slogans: [
    b("We build something.", "A gente constrói coisas."),
    b("Less noise. More product.", "Menos ruído. Mais produto."),
    b("Built independently.", "Construído de forma independente."),
    b("Made for the internet.", "Feito para a internet."),
  ],

  estudio: {
    titulo: b("A studio, not an agency", "Um estúdio, não uma agência"),
    p1: b(
      "VYRO does not sell hours. It designs, builds and ships its own software, then keeps maintaining it after launch: the App Store rejections, the selectors that break every week, the migration that has to run on a Tuesday night. That part is the job, not the aftermath.",
      "A VYRO não vende horas. Ela projeta, constrói e publica o próprio software, e continua mantendo depois do lançamento: as rejeições da App Store, os seletores que quebram toda semana, a migração que precisa rodar numa terça à noite. Essa parte é o trabalho, não a ressaca dele.",
    ),
    p2: b(
      "Each product grows its own identity. Birdy is neon and dense, LUMI is pearl and quiet, Postly is paper and orange. VYRO signs underneath, never over the top.",
      "Cada produto cresce com identidade própria. O Birdy é neon e denso, a LUMI é perolada e silenciosa, o Postly é papel e laranja. A VYRO assina embaixo, nunca por cima.",
    ),
    marcacao: b("VYRO owns the studio. The products carry their own names.", "A VYRO é dona do estúdio. Os produtos carregam os próprios nomes."),
  },

  produtos: {
    titulo: b("Products", "Produtos"),
    intro: b(
      "Everything below is written, published and maintained here.",
      "Tudo abaixo é escrito, publicado e mantido aqui.",
    ),
    abrir: b("Open", "Abrir"),
    ver: b("Read more", "Saber mais"),
    proximoTitulo: b("Next one", "O próximo"),
    proximoTexto: b(
      "Something is always half-built. It gets a name when it stands on its own.",
      "Sempre tem algo pela metade. Ganha um nome quando se sustentar sozinho.",
    ),
    estado: {
      ativo: b("shipping", "publicado"),
      beta: b("in beta", "em beta"),
      proximo: b("in progress", "em construção"),
    },
  },

  metodo: {
    titulo: b("How we build", "Como construímos"),
    intro: b(
      "Four habits that show up in every repository here.",
      "Quatro hábitos que aparecem em todo repositório daqui.",
    ),
    itens: [
      {
        titulo: b("A product counts when it is published", "Produto só conta quando está publicado"),
        texto: b(
          "Birdy went through three rounds of App Store rejection and two root-cause bugs in purchase validation before it stood up. A demo that never reaches a store is a prototype with good lighting.",
          "O Birdy passou por três rodadas de rejeição da App Store e dois bugs de causa-raiz na validação de compra antes de ficar de pé. Uma demo que nunca chega numa loja é um protótipo bem iluminado.",
        ),
      },
      {
        titulo: b("The defect list is written down", "A lista de defeitos fica escrita"),
        texto: b(
          "Every product keeps a catalogue of bugs with the root cause of each one. LUMI has 32 recorded cases, including the worst: three screens promising a photo never left the device after that stopped being true.",
          "Cada produto mantém um catálogo de bugs com a causa raiz de cada um. A LUMI tem 32 casos registrados, incluindo o pior deles: três telas prometendo que a foto nunca saía do aparelho depois que isso deixou de ser verdade.",
        ),
      },
      {
        titulo: b("Tests run before the release", "Os testes rodam antes do release"),
        texto: b(
          "941 Flutter tests on LUMI, 82 on Postly with CI green, 538 declared cases on the workshop system. Not for a badge in the README: to make the next change survivable.",
          "941 testes Flutter na LUMI, 82 no Postly com CI verde, 538 casos declarados no sistema da oficina. Não por um selo no README: para que a próxima mudança seja sobrevivível.",
        ),
      },
      {
        titulo: b("Few tools, taken deep", "Poucas ferramentas, levadas fundo"),
        texto: b(
          "Flutter for what runs in someone's hand, Rust for what runs on their machine, Supabase and Postgres behind both. A new dependency needs a reason that fits in one sentence.",
          "Flutter para o que roda na mão de alguém, Rust para o que roda na máquina, Supabase e Postgres atrás dos dois. Uma dependência nova precisa de um motivo que caiba numa frase.",
        ),
      },
    ],
  },

  numeros: {
    titulo: b("Where it stands", "Onde está"),
    itens: [
      { valor: "3", rotulo: b("products in the wild", "produtos publicados") },
      { valor: "6", rotulo: b("platforms supported", "plataformas atendidas") },
      { valor: "9", rotulo: b("languages shipped", "idiomas publicados") },
      { valor: "1.023", rotulo: b("automated tests", "testes automatizados") },
    ],
  },

  contato: {
    titulo: b("Talk to VYRO", "Falar com a VYRO"),
    texto: b(
      "Licensing a product, taking one to a new market, or building something from scratch. Write in English or Portuguese, whichever is faster for you.",
      "Licenciar um produto, levar um deles para um mercado novo, ou construir algo do zero. Escreva em português ou inglês, o que for mais rápido para você.",
    ),
    botao: b("Send an email", "Enviar um e-mail"),
    ou: b("or", "ou"),
  },

  rodape: {
    direitos: b("All rights reserved.", "Todos os direitos reservados."),
    navegar: b("Navigate", "Navegar"),
    produtos: b("Products", "Produtos"),
    contato: b("Contact", "Contato"),
  },

  produto: {
    voltar: b("All products", "Todos os produtos"),
    oQueE: b("What it is", "O que é"),
    numeros: b("Numbers", "Números"),
    stack: b("Stack", "Stack"),
    plataformas: b("Platforms", "Plataformas"),
    porVyro: b("A VYRO product", "Um produto VYRO"),
    naoAchado: b("This product does not exist here.", "Este produto não existe por aqui."),
  },
};
