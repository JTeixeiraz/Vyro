import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "../../lib/rota";
import { useLingua } from "../../lib/i18n";
import { useAoEntrar } from "../../lib/aoEntrar";
import { acharProduto } from "../../dados/produtos";
import { b } from "../textos-site";
import { Simbolo, Wordmark } from "../../brand/Marca";
import { Fone, TELA } from "../../comps/Aparelho";
import { Menu } from "../../comps/Menu";
import { Dique } from "../../comps/Dique";
import { NumeroAnimado } from "../../comps/NumeroAnimado";
import { arq } from "../../lib/caminho";
import { AoVivo } from "../../comps/AoVivo";
import Ferrofluid from "../../rb/Ferrofluid";
import GradualBlur from "../../rb/GradualBlur";
import "./lumi.css";

/**
 * LUMI — self-care.
 *
 * Este é o único site claro dos quatro, e continua claro de propósito: o app é
 * de pele, e a luz é o assunto. O que mudou é a densidade — papel quente,
 * Fraunces em display, e a pérola deixou de ser um PNG para virar o mesmo
 * material em shader que o app usa. É a identidade, não um enfeite.
 */

const T = {
  eyebrow: b("Skincare · Makeup · Wellbeing", "Skincare · Maquiagem · Bem-estar"),
  titulo: b("Start from what", "Comece pelo que"),
  tituloB: b("you already own", "você já tem"),
  sub: b(
    "LUMI reads your shelf, reads your skin, and builds the routine around both.",
    "A LUMI lê sua prateleira, lê sua pele, e monta a rotina em cima das duas coisas.",
  ),
  cta: b("See the app", "Ver o aplicativo"),
  mercado: b("Nine languages · Asia first", "Nove idiomas · a Ásia primeiro"),

  perolaRotulo: b("The pearl", "A pérola"),
  perolaTexto: b(
    "The glyphs, the glass and this bubble are one shader material. The identity is a lighting model, not a folder of exported icons.",
    "Os glifos, o vidro e esta bolha são um material só, em shader. A identidade é um modelo de luz, não uma pasta de ícones exportados.",
  ),

  passosTitulo: b("A day with LUMI", "Um dia com a LUMI"),
  passos: [
    {
      n: "07:10",
      t: b("The pearl listens", "A pérola escuta"),
      d: b("Tap it and ask anything. It knows your shelf and your history.", "Toque nela e pergunte. Ela conhece sua prateleira e seu histórico."),
      img: arq("/telas/lumi/homeLumi.webp"),
    },
    {
      n: "07:25",
      t: b("A reading, not a verdict", "Uma leitura, não um veredito"),
      d: b("Skin index with a margin, next to texture, luminosity and calm.", "Índice da pele com margem, ao lado de textura, luminosidade e calma."),
      img: arq("/telas/lumi/analise.webp"),
    },
    {
      n: "22:10",
      t: b("The routine is yours", "A rotina é sua"),
      d: b("Morning and night. Remove a step and it stays removed.", "Manhã e noite. Remova um passo e ele fica removido."),
      img: arq("/telas/lumi/rotina.webp"),
    },
    {
      n: "SUN",
      t: b("The week, kept", "A semana, guardada"),
      d: b("What you did, what changed, and the streak that holds it together.", "O que você fez, o que mudou, e a sequência que segura tudo."),
      img: arq("/telas/lumi/jornada.webp"),
    },
  ],

  privTitulo: b("What each photo does", "O que cada foto faz"),
  privTexto: b(
    "When the analysis moved to the server, three screens still promised the photo never left the device. That was fixed in all nine languages.",
    "Quando a análise passou para o servidor, três telas ainda prometiam que a foto nunca saía do aparelho. Isso foi corrigido nos nove idiomas.",
  ),
  privSelo: b("Written on the screen, not in a policy page", "Escrito na tela, não numa página de política"),
};

export function Lumi() {
  const { t } = useLingua();
  const produto = acharProduto("lumi")!;
  const hero = useAoEntrar<HTMLElement>({ filhos: ".l-sobe", passo: 110, limiar: 0 });
  const numeros = useAoEntrar<HTMLElement>({ filhos: ".l-num", passo: 90 });
  const dia = useAoEntrar<HTMLElement>({ filhos: ".l-anima", passo: 110, limiar: 0.1 });
  const perola = useRef<HTMLDivElement>(null);

  // A pérola se inclina para o ponteiro, como um objeto físico sob a mão —
  // não uma escuta real, mas o mesmo gesto de "responder ao toque" que a
  // própria copy descreve. CSS custom properties direto no elemento: nenhum
  // re-render do React por movimento de mouse.
  const inclinar = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const no = perola.current;
    if (!no) return;
    const r = no.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    no.style.setProperty("--tilt-x", `${(-py * 12).toFixed(2)}deg`);
    no.style.setProperty("--tilt-y", `${(px * 14).toFixed(2)}deg`);
  };
  const endireitar = () => {
    const no = perola.current;
    if (!no) return;
    no.style.setProperty("--tilt-x", "0deg");
    no.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="l-site">
      <div className="grao" aria-hidden="true" />
      <a className="pular" href="#conteudo">
        Skip to content
      </a>

      <Menu
        itens={[
          { label: "Birdy", link: "/birdy" },
          { label: "Postly", link: "/postly" },
          { label: "VYRO", link: "/" },
        ]}
        marca={
          <span className="l-marca">
            <Wordmark altura={14} comSimbolo={false} />
            <i aria-hidden="true" />
            <em>L U M I</em>
          </span>
        }
        camadas={["#e6d9c6", "#c8a97e"]}
        corBotao="#241c14"
        corBotaoAberto="#f6f2ea"
        acento="#b08d57"
      />

      <main id="conteudo">
        <header className="l-hero" ref={hero}>
          <div className="l-env l-hero-grade">
            <div className="l-hero-texto">
              <p className="l-eyebrow l-sobe">
                <Simbolo tamanho={12} cor="currentColor" espessura={5} />
                {t(T.eyebrow)}
              </p>
              <h1 className="l-h1 l-sobe">
                <span>{t(T.titulo)}</span>
                <em>{t(T.tituloB)}</em>
              </h1>
              <p className="l-sub l-sobe">{t(T.sub)}</p>
              <div className="l-acoes l-sobe">
                <a className="l-bt" href="#dia">
                  {t(T.cta)}
                  <i aria-hidden="true">↓</i>
                </a>
                <span className="l-nota">{t(T.mercado)}</span>
              </div>
            </div>

            {/* A pérola real, exportada do app. É a identidade de verdade; um
                 shader tentando imitá-la aqui só ficou sem forma. Os anéis são
                 a "escuta" da copy ("toque nela e pergunte") em forma de sonar,
                 e o objeto se inclina para o ponteiro como algo físico. */}
            <div
              className="l-perola l-sobe"
              ref={perola}
              onPointerMove={inclinar}
              onPointerLeave={endireitar}
            >
              <div className="l-perola-halo" aria-hidden="true" />
              <i className="l-sonar l-sonar-1" aria-hidden="true" />
              <i className="l-sonar l-sonar-2" aria-hidden="true" />
              {/* A inclinação e o flutuar são duas animações no mesmo eixo
                  (transform); em elementos separados elas não competem. */}
              <div className="l-perola-tilt">
                <img
                  className="l-perola-img"
                  src={arq("/telas/lumi/perola.webp")}
                  alt=""
                  width={980}
                  height={1000}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <GradualBlur target="parent" position="bottom" height="5rem" strength={1.5} divCount={5} curve="bezier" />
        </header>

        <section className="l-numeros" ref={numeros}>
          <div className="l-env l-numeros-grade">
            {produto.numeros.map((n) => (
              <div key={n.rotulo.en} className="l-num">
                <strong>
                  <NumeroAnimado valor={n.valor} />
                </strong>
                <span>{t(n.rotulo)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="l-material">
          {/* AoVivo desmonta o shader assim que a faixa sai da tela: sem
              isso ele continuaria rodando atrás da linha do tempo e do
              rodapé pelo resto da visita. */}
          <div className="palco l-material-palco" aria-hidden="true">
            <AoVivo>
              <Ferrofluid
                colors={["#d9a97f", "#b3798f", "#6d4a34"]}
                speed={0.2}
                scale={3.4}
                turbulence={0.28}
                fluidity={0.34}
                rimWidth={0.34}
                sharpness={1.5}
                shimmer={0.5}
                glow={1.1}
                flowDirection="right"
                opacity={0.9}
                mouseInteraction
                mouseStrength={0.7}
                mouseRadius={0.3}
              />
            </AoVivo>
          </div>
          <div className="l-env l-material-grade">
            <p className="l-rotulo">{t(T.perolaRotulo)}</p>
            <p className="l-material-texto">{t(T.perolaTexto)}</p>
          </div>
        </section>

        {/* Um dia, na ordem em que ele acontece. A LUMI não usa o sticky
             vertical nem a galeria deitada: aqui o eixo é o relógio. */}
        <section className="l-dia" id="dia" ref={dia}>
          <div className="l-env">
            <p className="l-rotulo">{t(T.passosTitulo)}</p>
            <ol className="l-rail">
              {T.passos.map((pp, i) => (
                <li key={pp.n} className={`l-parada${i % 2 === 1 ? " l-parada-inv" : ""} l-anima`}>
                  <div className="l-parada-marca">
                    <span className="l-hora">{pp.n}</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="l-parada-texto">
                    <h3>{t(pp.t)}</h3>
                    <p>{t(pp.d)}</p>
                  </div>
                  <div className="l-parada-tela">
                    <Fone
                      src={pp.img}
                      alt={`LUMI — ${t(pp.t)}`}
                      largura={TELA.lumi.l}
                      altura={TELA.lumi.a}
                      escala="min(196px, 56vw)"
                      carcaca="#2b2018"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="l-priv">
          <div className="l-env l-priv-grade">
            <h2 className="l-priv-titulo">{t(T.privTitulo)}</h2>
            <div>
              <p className="l-priv-texto">{t(T.privTexto)}</p>
              <p className="l-selo">{t(T.privSelo)}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="l-rodape">
        <div className="l-env l-rodape-grade">
          <span className="l-rodape-marca">L U M I</span>
          <nav>
            <Link para="/">VYRO</Link>
            <Link para="/birdy">Birdy</Link>
            <Link para="/postly">Postly</Link>
            <a href="mailto:joaopedroteixeirareis@gmail.com">joaopedroteixeirareis@gmail.com</a>
          </nav>
          <p className="l-assina">by VYRO · ©2026</p>
        </div>
      </footer>

      <Dique />
    </div>
  );
}
