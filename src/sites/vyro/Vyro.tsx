import { useMemo, useRef } from "react";
import { Link } from "../../lib/rota";
import { useLingua } from "../../lib/i18n";
import { useAoEntrar } from "../../lib/aoEntrar";
import { PRODUTOS } from "../../dados/produtos";
import { b } from "../textos-site";
import { Simbolo, Wordmark } from "../../brand/Marca";
import { Fone, Janela, TELA } from "../../comps/Aparelho";
import { Menu } from "../../comps/Menu";
import { Dique } from "../../comps/Dique";
import { MarcaParticulas } from "../../comps/MarcaParticulas";
import { arq } from "../../lib/caminho";
import { Vitrine } from "../../comps/Vitrine";
import type { ItemVitrine } from "../../comps/Vitrine";
import DepthText from "../../rb/DepthText";
import ScrollExpand from "../../rb/ScrollExpand";
import BorderGlow from "../../rb/BorderGlow";
import "./vyro.css";

/**
 * A holding.
 *
 * O papel é quente e a página é densa de propósito: a versão anterior era
 * branca e vazia, o que fazia o estúdio parecer um placeholder. O ritmo aqui é
 * claro -> cinematográfico -> escuro -> claro, e a cor grande de cada seção é a
 * cor do produto de que ela fala. A VYRO assina embaixo, não por cima.
 */

const T = {
  eyebrow: b("Independent software studio", "Estúdio de software independente"),
  titulo1: b("Software", "Software"),
  titulo2: b("gets built", "é feito"),
  titulo3: b("here.", "aqui."),
  sub: b(
    "Three products in the market, owned end to end. No agency work, no clients — VYRO builds what it ships and keeps shipping after launch.",
    "Três produtos no mercado, do começo ao fim. Sem agência, sem cliente — a VYRO constrói o que publica e continua publicando depois do lançamento.",
  ),
  verProdutos: b("See the products", "Ver os produtos"),
  falar: b("Talk to us", "Falar com a gente"),
  expRotulo: b("The studio", "O estúdio"),
  expDica: b("scroll", "role"),
  expH: b("Three products. One studio.", "Três produtos. Um estúdio."),
  expP: b(
    "An aviary manager, a self-care app and a marketing suite that runs offline. Nothing here is a demo.",
    "Um gestor de aviário, um app de self-care e uma suíte de marketing que roda offline. Nada aqui é demo.",
  ),
  expFrase: b("Precision, not excess.", "Precisão, não excesso."),
  provaRotulo: b("Already out there", "Já está no mundo"),
  indice: b("The products", "Os produtos"),
  indiceNota: b(
    "Each one has its own site, its own type and its own colour. Hover to look inside.",
    "Cada um tem site, tipografia e cor próprios. Passe o mouse para ver por dentro.",
  ),
  abrir: b("Open", "Abrir"),
  comoRotulo: b("How it works here", "Como funciona aqui"),
  contatoH: b("Want one of these for your market?", "Quer um destes para o seu mercado?"),
  contatoP: b(
    "Licensing, a new market, or something built from scratch.",
    "Licenciamento, um novo mercado, ou algo feito do zero.",
  ),
  contatoBt: b("Send an email", "Mandar um email"),
};

const PROVAS = [
  { v: "3", r: b("products shipping", "produtos publicados") },
  { v: "6", r: b("platforms", "plataformas") },
  { v: "9", r: b("languages", "idiomas") },
  { v: "1.023", r: b("automated tests", "testes automatizados") },
];

const COMO = [
  {
    t: b("Shipped, not demoed", "Publicado, não demonstrado"),
    d: b(
      "Every product is in a store, on a machine, in someone's hands. There is no roadmap page here.",
      "Todo produto está numa loja, numa máquina, na mão de alguém. Não existe página de roadmap aqui.",
    ),
  },
  {
    t: b("Maintained after launch", "Mantido depois do lançamento"),
    d: b(
      "Store rejections, broken selectors, migrations. That is the job, and it is the part nobody photographs.",
      "Rejeição de loja, seletor quebrado, migração. Esse é o trabalho, e é a parte que ninguém fotografa.",
    ),
  },
  {
    t: b("Its own identity", "Identidade própria"),
    d: b(
      "Each product looks like itself, never like a VYRO template. The studio signs underneath.",
      "Cada produto se parece consigo mesmo, nunca com um template da VYRO. O estúdio assina embaixo.",
    ),
  },
];

/** A arte de cada produto no bloco dedicado: o aparelho certo para a plataforma. */
function Arte({ id }: { id: string }) {
  if (id === "birdy") {
    return (
      <div className="v-arte-par">
        <Fone src={arq("/telas/birdy/home.webp")} alt="Birdy — plantel" {...dim(TELA.birdy)} escala="min(240px, 58vw)" carcaca="#10231a" />
        <Fone src={arq("/telas/birdy/caixa.webp")} alt="Birdy — caixa" {...dim(TELA.birdy)} escala="min(200px, 48vw)" carcaca="#10231a" className="v-arte-atras" />
      </div>
    );
  }
  if (id === "lumi") {
    return (
      <div className="v-arte-par">
        <Fone src={arq("/telas/lumi/analise.webp")} alt="LUMI — análise de pele" {...dim(TELA.lumi)} escala="min(240px, 58vw)" carcaca="#2b2118" />
        <Fone src={arq("/telas/lumi/rotina.webp")} alt="LUMI — rotina" {...dim(TELA.lumi)} escala="min(200px, 48vw)" carcaca="#2b2118" className="v-arte-atras" />
      </div>
    );
  }
  return <Janela src={arq("/telas/postly/campanha.webp")} alt="Postly — campanha" {...dim(TELA.postly)} titulo="postly" />;
}

function dim(t: { l: number; a: number }) {
  return { largura: t.l, altura: t.a };
}

export function Vyro() {
  const { t } = useLingua();
  const hero = useAoEntrar<HTMLDivElement>({ filhos: ".v-sobe", passo: 80 });
  const heroAlto = useRef<HTMLElement>(null);
  const provas = useAoEntrar<HTMLDivElement>({ filhos: ".v-prova", passo: 70 });
  const como = useAoEntrar<HTMLDivElement>({ filhos: ".v-como-item", passo: 90 });
  const produtos = useRef<HTMLElement>(null);

  const itensMenu = PRODUTOS.map((p) => ({ label: p.nome, link: `/${p.slug}`, ariaLabel: p.nome }));

  /**
   * Os itens da vitrine. A captura e a moldura de cada produto vêm daqui: o
   * Birdy e a LUMI são apps de celular, o Postly é desktop — a lista de
   * plataformas não serve de critério (o Birdy também roda no Windows), o que
   * decide é a captura que está sendo mostrada.
   */
  const itensVitrine = useMemo<ItemVitrine[]>(
    () =>
      PRODUTOS.map((p) => {
        const eDesktop = p.slug === "postly";
        const captura = arq(
          eDesktop
            ? "/telas/postly/campanha.webp"
            : p.slug === "lumi"
              ? "/telas/lumi/analise.webp"
              : "/telas/birdy/home.webp",
        );
        const medida = eDesktop ? TELA.postly : p.slug === "lumi" ? TELA.lumi : TELA.birdy;
        return {
          id: p.id,
          nome: p.nome,
          slug: p.slug,
          acento: p.acento,
          tipo: t(p.tipo),
          resumo: t(p.tagline),
          cta: `${t(T.abrir)} ${p.nome}`,
          captura,
          largura: medida.l,
          altura: medida.a,
          forma: eDesktop ? "paisagem" : "retrato",
          moldura: ({ className }) =>
            eDesktop ? (
              <Janela
                src={captura}
                alt={`${p.nome} — captura`}
                largura={medida.l}
                altura={medida.a}
                titulo={p.slug}
                className={className}
              />
            ) : (
              <Fone
                src={captura}
                alt={`${p.nome} — captura`}
                largura={medida.l}
                altura={medida.a}
                escala="100%"
                carcaca={p.slug === "lumi" ? "#2b2118" : "#10231a"}
                className={className}
              />
            ),
        };
      }),
    [t],
  );

  return (
    <div className="v-site">
      <div className="grao" aria-hidden="true" />
      <a className="pular" href="#conteudo">
        Skip to content
      </a>

      <Menu itens={itensMenu} marca={<Wordmark altura={18} />} />

      <main id="conteudo">
        {/* ---------- herói: assimétrico, tipo grande, e a marca extrudada ---------- */}
        {/* A seção é mais alta que a tela; o painel dentro dela fica preso.
             Essa sobra é exatamente o curso que a marca leva para se desfazer:
             a página só volta a andar depois que o último ponto some. */}
        <header className="v-hero" ref={heroAlto}>
          <div className="v-hero-preso" ref={hero}>
            {/* O canvas cobre o herói inteiro — não só a metade direita —, e a
                âncora da marca fica perto do texto. É isso que dá à dispersão
                a tela toda para percorrer, em vez de uma caixa pequena. Um
                degradê de máscara protege a leitura sem cortar o movimento. */}
            <div className="v-hero-particulas" aria-hidden="true">
              <MarcaParticulas
                cor="#17150f"
                quantidade={3400}
                dispersao={1.05}
                tamanho={0.98}
                ancoraX={0.5}
                ancoraY={0.47}
                refCurso={heroAlto}
              />
            </div>

            <div className="v-env v-hero-grade">
              <div className="v-hero-texto">
                <p className="v-eyebrow v-sobe">
                  <Simbolo tamanho={13} cor="currentColor" espessura={5} />
                  {t(T.eyebrow)} · 2026
                </p>
                <h1 className="v-h1 v-sobe">
                  <span>{t(T.titulo1)}</span>
                  <span>
                    {t(T.titulo2)} <em>{t(T.titulo3)}</em>
                  </span>
                </h1>
                <p className="v-lead v-sobe">{t(T.sub)}</p>
                <div className="v-acoes v-sobe">
                  <a
                    className="v-bt v-bt-cheio"
                    href="#produtos"
                    onClick={(e) => {
                      e.preventDefault();
                      produtos.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {t(T.verProdutos)}
                    <i aria-hidden="true">↓</i>
                  </a>
                  <a className="v-bt" href="mailto:joaopedroteixeirareis@gmail.com">
                    {t(T.falar)}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* ---------- o momento cinematográfico: a captura abre em tela cheia ----------
             Sem cópia por cima: sobre uma interface densa o texto briga com ela.
             A frase vem antes, no fluxo, e a abertura fica como beat puro. */}
        <section className="v-expandir" aria-label={t(T.expH)}>
          <div className="v-env v-exp-intro">
            <p className="v-rotulo">{t(T.expRotulo)}</p>
            <h2>{t(T.expH)}</h2>
            <p className="v-exp-linha">{t(T.expP)}</p>
          </div>
          <ScrollExpand
            src={arq("/marca-escultura.webp")}
            alt="A marca da VYRO como objeto, sobre pedestal de mármore"
            scrollHint={t(T.expDica)}
            useWindowScroll
            startWidth={38}
            startHeight={52}
            startRadius={18}
            endRadius={0}
            mediaZoom={1.12}
            scrollDistance={0.85}
            holdDistance={0.14}
            overlayScrim={0.4}
          >
            {/* A imagem é uma foto de objeto sobre fundo liso, não uma
                interface: aqui, diferente da captura do Postly, um texto por
                cima não briga com nada. Ele entra só quando o quadro já está
                em tela cheia. */}
            <div className="v-exp-selo">
              <p className="v-exp-eyebrow">VYRO</p>
              <p className="v-exp-frase">{t(T.expFrase)}</p>
            </div>
          </ScrollExpand>
        </section>

        {/* ---------- faixa escura: o contraste que a página precisava ---------- */}
        <section className="v-provas" ref={provas}>
          <div className="v-env">
            <p className="v-rotulo v-rotulo-claro">{t(T.provaRotulo)}</p>
            <div className="v-provas-grade">
              {PROVAS.map((p) => (
                <BorderGlow
                  key={p.v}
                  className="v-prova"
                  backgroundColor="#16150f"
                  borderRadius={18}
                  glowRadius={30}
                  glowIntensity={0.7}
                  edgeSensitivity={34}
                  colors={["#c1ff72", "#7f8d5d", "#2a2a20"]}
                >
                  <div className="v-prova-corpo">
                    <strong>{p.v}</strong>
                    <span>{t(p.r)}</span>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- o índice: a vitrine, que abre de verdade no hover ---------- */}
        <section className="v-indice" id="produtos" ref={produtos}>
          <div className="v-env v-indice-topo">
            <p className="v-rotulo">{t(T.indice)}</p>
            <p className="v-indice-nota">{t(T.indiceNota)}</p>
          </div>
          <Vitrine itens={itensVitrine} />
        </section>

        {/* ---------- um bloco por produto, no campo de cor do produto ---------- */}
        <section className="v-produtos">
          {PRODUTOS.map((p, i) => (
            <BlocoProduto key={p.id} p={p} invertido={i % 2 === 1} />
          ))}
        </section>

        {/* ---------- como funciona: editorial denso, régua de 1px, sem card ---------- */}
        <section className="v-como" ref={como}>
          <div className="v-env">
            <p className="v-rotulo">{t(T.comoRotulo)}</p>
            <div className="v-como-grade">
              {COMO.map((c) => (
                <article key={c.t.en} className="v-como-item">
                  <h3>{t(c.t)}</h3>
                  <p>{t(c.d)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- contato ---------- */}
        <section className="v-contato">
          <div className="v-env">
            <h2>{t(T.contatoH)}</h2>
            <p>{t(T.contatoP)}</p>
            <a className="v-bt v-bt-lime" href="mailto:joaopedroteixeirareis@gmail.com">
              {t(T.contatoBt)}
              <i aria-hidden="true">→</i>
            </a>
            <div className="v-assinatura" aria-hidden="true">
              <DepthText
                text="VYRO"
                layers={24}
                depth={2}
                faceColor="#17150f"
                depthColor="#cfc8b4"
                tilt={5}
                perspective={1100}
                smoothing={0.12}
                orbitSpeed={0.2}
                fontSize="clamp(3.6rem, 13vw, 11rem)"
                fontWeight={700}
                shadow={false}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="v-rodape">
        <div className="v-env v-rodape-grade">
          <Wordmark altura={17} />
          <nav>
            {PRODUTOS.map((p) => (
              <Link key={p.id} para={`/${p.slug}`}>
                {p.nome}
              </Link>
            ))}
            <a href="mailto:joaopedroteixeirareis@gmail.com">joaopedroteixeirareis@gmail.com</a>
          </nav>
          <span className="v-copy">©2026</span>
        </div>
      </footer>

      <Dique />
    </div>
  );
}

function BlocoProduto({ p, invertido }: { p: (typeof PRODUTOS)[number]; invertido: boolean }) {
  const { t } = useLingua();
  const ref = useAoEntrar<HTMLElement>({ filhos: ".v-pb-anima", passo: 90, limiar: 0.12 });

  return (
    <article
      className={`v-pb${invertido ? " v-pb-inv" : ""}`}
      ref={ref}
      style={{ ["--acento" as string]: p.acento }}
    >
      <div className="v-env v-pb-grade">
        <div className="v-pb-texto">
          <p className="v-pb-tipo v-pb-anima">
            {t(p.tipo)} · {p.desde}
          </p>
          <h2 className="v-pb-nome v-pb-anima">{p.nome}</h2>
          <p className="v-pb-tag v-pb-anima">{t(p.tagline)}</p>
          <p className="v-pb-resumo v-pb-anima">{t(p.resumo)}</p>
          <ul className="v-pb-stack v-pb-anima">
            {p.stack.slice(0, 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link className="v-bt v-bt-cheio v-pb-anima" para={`/${p.slug}`}>
            {p.nome === "Postly" ? "Open Postly" : `Open ${p.nome}`}
            <i aria-hidden="true">→</i>
          </Link>
        </div>
        <div className="v-pb-arte v-pb-anima">
          <Arte id={p.id} />
        </div>
      </div>
    </article>
  );
}
