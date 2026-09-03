/**
 * O catálogo da holding. Cada produto guarda o próprio acento porque a marca-mãe
 * não pinta os filhos: a VYRO assina embaixo, não por cima.
 *
 * Para acrescentar um produto: copie um bloco, mantenha os dois idiomas e
 * ponha `estado: "proximo"` enquanto ele não existir de verdade.
 */

export type Estado = "ativo" | "beta" | "proximo";

export type Numero = {
  valor: string;
  rotulo: { en: string; pt: string };
};

export type Bloco = {
  titulo: { en: string; pt: string };
  texto: { en: string; pt: string };
};

export type Produto = {
  id: string;
  nome: string;
  slug: string;
  acento: string;
  desde: string;
  estado: Estado;
  tipo: { en: string; pt: string };
  tagline: { en: string; pt: string };
  resumo: { en: string; pt: string };
  plataformas: string[];
  stack: string[];
  numeros: Numero[];
  blocos: Bloco[];
  link?: { rotulo: string; url: string };
  repo?: { rotulo: string; url: string };
};

export const PRODUTOS: Produto[] = [
  {
    id: "birdy",
    nome: "Birdy",
    slug: "birdy",
    acento: "#a8ff3e",
    desde: "2026",
    estado: "ativo",
    tipo: { en: "SaaS · mobile and desktop", pt: "SaaS · mobile e desktop" },
    tagline: {
      en: "Aviary management for people who breed exotic birds.",
      pt: "Gestão de aviário para quem cria aves exóticas.",
    },
    resumo: {
      en: "Flock records with genetics down to the locus, breeding from pairing to hatch, cash flow, stock, health management and sales. The genetics engine covers seven species and is shared between phone and desktop.",
      pt: "Plantel com genética até o loco, reprodução do acasalamento à eclosão, fluxo de caixa, estoque, manejo sanitário e vendas. O motor genético cobre sete espécies e é o mesmo no celular e no desktop.",
    },
    plataformas: ["Android", "iOS", "Windows"],
    stack: ["Flutter", "Firebase", "Supabase", "Riverpod", "Drift"],
    numeros: [
      { valor: "7", rotulo: { en: "species in the genetics engine", pt: "espécies no motor genético" } },
      { valor: "3", rotulo: { en: "platforms from one codebase", pt: "plataformas no mesmo código" } },
      { valor: "3", rotulo: { en: "plans: Free, Pro, Ultra", pt: "planos: Free, Pro e Ultra" } },
    ],
    blocos: [
      {
        titulo: { en: "Genetics that answers the real question", pt: "A genética responde à pergunta real" },
        texto: {
          en: "A breeder does not want a table of alleles. They want to know what comes out of this pairing, and whether the two birds are too closely related. The pairing simulator and the inbreeding coefficient answer both, per species.",
          pt: "O criador não quer uma tabela de alelos. Ele quer saber o que sai deste acasalamento e se as duas aves são parentes demais. O simulador de cruzamento e o coeficiente de consanguinidade respondem às duas coisas, por espécie.",
        },
      },
      {
        titulo: { en: "The desktop is a different animal", pt: "O desktop é outro bicho" },
        texto: {
          en: "Not a stretched phone screen. It was rewritten local-first on SQLite for the breeder who runs the aviary from a desk: income statement, financial analysis and bulk entry, syncing with the same backend.",
          pt: "Não é a tela do celular esticada. Foi reescrito local-first sobre SQLite para o criador que toca o aviário sentado numa mesa: DRE, análise financeira e lançamento em massa, sincronizando com o mesmo backend.",
        },
      },
      {
        titulo: { en: "Selling is part of breeding", pt: "Vender faz parte de criar" },
        texto: {
          en: "A bird leaves the aviary through WhatsApp, not through a marketplace. Birdy assembles the listing with lineage, photos and price, and writes the sale into the cash flow on the same tap.",
          pt: "A ave sai do aviário pelo WhatsApp, não por um marketplace. O Birdy monta o anúncio com linhagem, fotos e preço, e lança a venda no fluxo de caixa no mesmo toque.",
        },
      },
    ],
  },
  {
    id: "lumi",
    nome: "LUMI",
    slug: "lumi",
    acento: "#d9c6a5",
    desde: "2026",
    estado: "beta",
    tipo: { en: "App · self-care", pt: "App · self-care" },
    tagline: {
      en: "Self-care that understands your skin, your products and your routine.",
      pt: "Self-care que entende sua pele, seus produtos e sua rotina.",
    },
    resumo: {
      en: "Skincare, makeup and wellbeing treated as equals. LUMI reads the skin, reads what is already on the shelf, builds the routine around both, and keeps the record of what changed. Built for Asia first, in nine languages.",
      pt: "Skincare, maquiagem e bem-estar tratados como iguais. A LUMI lê a pele, lê o que já está na prateleira, monta a rotina em cima das duas coisas e guarda o registro do que mudou. Feita para a Ásia primeiro, em nove idiomas.",
    },
    plataformas: ["Android", "iOS"],
    stack: ["Flutter", "Riverpod", "Drift", "Supabase", "GLSL", "Cloudflare R2"],
    numeros: [
      { valor: "9", rotulo: { en: "languages, Asia first", pt: "idiomas, a Ásia primeiro" } },
      { valor: "941", rotulo: { en: "tests on the app", pt: "testes no aplicativo" } },
      { valor: "33", rotulo: { en: "glyphs carved in shader", pt: "glifos esculpidos em shader" } },
    ],
    blocos: [
      {
        titulo: { en: "The shelf comes before the recommendation", pt: "A prateleira vem antes da recomendação" },
        texto: {
          en: "Most apps recommend a product to buy. LUMI starts from what the person already owns, reads the INCI list, and flags the combinations that cancel each other out before suggesting anything new.",
          pt: "A maioria dos aplicativos recomenda um produto para comprar. A LUMI parte do que a pessoa já tem, lê a lista INCI e aponta as combinações que se anulam antes de sugerir qualquer coisa nova.",
        },
      },
      {
        titulo: { en: "The photo of a face is not a small thing", pt: "A foto de um rosto não é coisa pequena" },
        texto: {
          en: "When the analysis moved to the server, three screens were still promising the photo never left the device. That was the worst defect this app has had, and it was fixed in all nine languages: the screen now says exactly what each photo does.",
          pt: "Quando a análise passou para o servidor, três telas ainda prometiam que a foto nunca saía do aparelho. Foi o defeito mais grave que este app já teve, e foi corrigido nos nove idiomas: a tela agora diz exatamente o que cada foto faz.",
        },
      },
      {
        titulo: { en: "One definition of light for everything", pt: "Uma definição de luz para tudo" },
        texto: {
          en: "The glyphs, the glass and the liquid-metal bubble are the same shader material. The identity is not a set of exported icons: it is one lighting model the whole interface is lit by.",
          pt: "Os glifos, o vidro e a bolha de metal líquido são o mesmo material em shader. A identidade não é um conjunto de ícones exportados: é um modelo de luz que acende a interface inteira.",
        },
      },
    ],
  },
  {
    id: "postly",
    nome: "Postly",
    slug: "postly",
    acento: "#e2703a",
    desde: "2026",
    estado: "ativo",
    tipo: { en: "Desktop · open source", pt: "Desktop · open source" },
    tagline: {
      en: "A marketing department that runs on your own machine.",
      pt: "Um departamento de marketing que roda na sua própria máquina.",
    },
    resumo: {
      en: "Write the goal in one sentence. Four AI roles take turns on local models to research the market, decide the creative line, produce the piece, audit it and publish. Nothing leaves the machine unless you publish it.",
      pt: "Escreva o objetivo em uma frase. Quatro cargos de IA se revezam em modelos locais para pesquisar o mercado, decidir a linha criativa, produzir a peça, auditar e publicar. Nada sai da máquina a não ser o que você publica.",
    },
    plataformas: ["Linux", "macOS", "Windows"],
    stack: ["Tauri", "Rust", "React", "Ollama", "Playwright"],
    numeros: [
      { valor: "10.364", rotulo: { en: "lines of Rust", pt: "linhas de Rust" } },
      { valor: "82", rotulo: { en: "tests, CI green", pt: "testes, CI verde" } },
      { valor: "MIT", rotulo: { en: "public, not for profit", pt: "público, sem fins lucrativos" } },
    ],
    blocos: [
      {
        titulo: { en: "Never two models resident at once", pt: "Nunca dois modelos residentes ao mesmo tempo" },
        texto: {
          en: "At every hand-off the system measures free memory, picks the strongest model that fits, loads it, takes the answer, unloads it, and passes on only the message that crosses. That unload is the reason the product fits on an ordinary machine. It is the central decision, not an optimisation.",
          pt: "A cada troca de cargo o sistema mede a memória livre, escolhe o modelo mais forte que couber, sobe, recebe a resposta, descarrega e passa adiante só a mensagem que atravessa. Esse descarregamento é o que faz o produto caber numa máquina comum. É a decisão central, não uma otimização.",
        },
      },
      {
        titulo: { en: "The rank matches what the role delivers", pt: "O nível do cargo é proporcional ao que ele entrega" },
        texto: {
          en: "Whoever decides needs to reason; whoever fills a finished brief does not. The hierarchy survives changing providers: swap Ollama for Claude Code and the axis simply becomes Opus, Sonnet, Haiku.",
          pt: "Quem decide precisa raciocinar; quem cumpre um briefing pronto, não. A hierarquia sobrevive à troca de provedor: troque o Ollama pelo Claude Code e o eixo vira Opus, Sonnet e Haiku.",
        },
      },
      {
        titulo: { en: "The README says what does not work", pt: "O README diz o que não funciona" },
        texto: {
          en: "Speed without a GPU is roughly 1.2 tokens per second on a dense 14B. Social network selectors break weekly. The vault protects against a backup, not against a program running as your user. All of that is written down where a user reads it, not buried.",
          pt: "Velocidade sem GPU é cerca de 1,2 token por segundo num denso de 14B. Os seletores das redes sociais quebram toda semana. O cofre protege contra um backup, não contra um programa rodando com o seu usuário. Tudo isso está escrito onde o usuário lê, não enterrado.",
        },
      },
    ],
    link: { rotulo: "postly site", url: "https://jteixeiraz.github.io/Postly/" },
    repo: { rotulo: "github", url: "https://github.com/JTeixeiraz/Postly" },
  },
];

export const PROXIMO_ATIVO = true;

export function acharProduto(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}
