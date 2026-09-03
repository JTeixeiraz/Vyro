import { Link } from "../../lib/rota";
import { useLingua } from "../../lib/i18n";
import { useAoEntrar } from "../../lib/aoEntrar";
import { GaleriaHorizontal } from "../../comps/GaleriaHorizontal";
import { acharProduto } from "../../dados/produtos";
import { b } from "../textos-site";
import { Simbolo, Wordmark } from "../../brand/Marca";
import { Fone, TELA } from "../../comps/Aparelho";
import { Menu } from "../../comps/Menu";
import { Dique } from "../../comps/Dique";
import { arq } from "../../lib/caminho";
import { AoVivo } from "../../comps/AoVivo";
import Balatro from "../../rb/Balatro";
import RippleDistortion from "../../rb/RippleDistortion";
import GradualBlur from "../../rb/GradualBlur";
import "./birdy.css";

/**
 * Birdy — o aviário.
 *
 * O app é escuro e verde; o site agora também é. Antes era papel branco com o
 * app escuro dentro, e as duas coisas não se pareciam. O fundo do herói é um
 * Balatro dessaturado em verde-folha: serve de textura orgânica, não de neon.
 * A ave é a captura real do app, e responde ao ponteiro como água.
 */

const T = {
  eyebrow: b("Aviary software", "Software de aviário"),
  titulo: b("Every bird", "Cada ave"),
  tituloB: b("has a lineage", "tem uma linhagem"),
  sub: b(
    "The flock, the pairings, the money and the sale. In one place, on the phone and on the desk.",
    "O plantel, os acasalamentos, o dinheiro e a venda. Num lugar só, no celular e na mesa.",
  ),
  cta: b("See the app", "Ver o aplicativo"),
  plataformas: b("Android · iOS · Windows", "Android · iOS · Windows"),

  aveRotulo: b("Ring Neck · TEST-BIRD-001", "Ring Neck · TEST-BIRD-001"),
  aveH: b("A record, not a photo album", "Um registro, não um álbum de fotos"),
  genRotulo: b("Pairing simulator", "Simulador de cruzamento"),
  genCabeca: b("What comes out of this pairing?", "O que sai deste acasalamento?"),
  genPai: b("Father", "Pai"),
  genMae: b("Mother", "Mãe"),
  genSaida: b("Expected offspring", "Prole esperada"),
  genRodape: b(
    "One example from the Ring Neck engine. The app runs the same calculation for all seven species, and the desktop gives the same answer as the phone.",
    "Um exemplo do motor de Ring Neck. O app roda o mesmo cálculo para as sete espécies, e o desktop dá a mesma resposta do celular.",
  ),
  deskRotulo: b("On the desk", "Na mesa"),
  deskCabeca: b("The desktop is a different animal", "O desktop é outro bicho"),
  deskTexto: b(
    "Not a stretched phone screen. It was rewritten local-first on SQLite for the breeder who runs the aviary from a desk: income statement, financial analysis and bulk entry, syncing with the same backend.",
    "Não é a tela do celular esticada. Foi reescrito local-first sobre SQLite para o criador que toca o aviário sentado numa mesa: DRE, análise financeira e lançamento em massa, sincronizando com o mesmo backend.",
  ),
  deskSelo: b("Ultra only", "Exclusivo Ultra"),
  aveDica: b("Touch the bird", "Toque na ave"),
  aveTexto: b(
    "Photo, ring number, species and price. A bird registered here carries its whole line with it.",
    "Foto, anilha, espécie e preço. Uma ave registrada aqui carrega a linhagem inteira junto.",
  ),

  passosTitulo: b("Inside", "Por dentro"),
  passosCabeca: b("Four screens, one aviary", "Quatro telas, um aviário"),
  galDica: b("keep scrolling", "continue rolando"),
  passos: [
    {
      n: "01",
      t: b("The flock", "O plantel"),
      d: b("Every bird with photo, ring number, species and price.", "Cada ave com foto, anilha, espécie e preço."),
      img: arq("/telas/birdy/plantel.webp"),
    },
    {
      n: "02",
      t: b("The pairing", "O acasalamento"),
      d: b("Pick father and mother. See what can hatch, per species.", "Escolha pai e mãe. Veja o que pode nascer, por espécie."),
      img: arq("/telas/birdy/genetica.webp"),
    },
    {
      n: "03",
      t: b("The money", "O dinheiro"),
      d: b("Feed out, sale in. The balance is there when you need it.", "Ração sai, venda entra. O saldo está lá quando você precisa."),
      img: arq("/telas/birdy/caixa.webp"),
    },
    {
      n: "04",
      t: b("The day", "O dia"),
      d: b("What needs attention today, before you open the aviary.", "O que pede atenção hoje, antes de você abrir o aviário."),
      img: arq("/telas/birdy/home.webp"),
    },
  ],

  genTitulo: b("Seven species, one genetics engine", "Sete espécies, um motor genético"),
  genTexto: b(
    "A pairing simulated at the perch gives the same answer as the one simulated at the desk.",
    "Um acasalamento simulado no poleiro dá a mesma resposta do simulado na mesa.",
  ),
  especies: [
    "Ring Neck",
    "Calopsita",
    "Agapornis Roseicollis",
    "Agapornis Aro Branco",
    "Canário de Cor",
    "Periquito Australiano",
    "Papagaio",
  ],

  fecharTitulo: b("Free, Pro and Ultra", "Free, Pro e Ultra"),
  fecharTexto: b("Android, iOS and Windows. The desktop is Ultra only.", "Android, iOS e Windows. O desktop é exclusivo Ultra."),
};

/** Um exemplo real do simulador: as duas aves do plantel de teste. */
const PAIS = [
  { papel: "pai" as const, nome: "RingNec", gene: "Azul · portador Canela", img: arq("/telas/birdy/pai.webp") },
  { papel: "mae" as const, nome: "Ring Neck 2", gene: "Opalino · portador Canela", img: arq("/telas/birdy/mae.webp") },
];

const PROLE = [
  { nome: "Opalino", pct: 38 },
  { nome: "Azul", pct: 27 },
  { nome: "Canela", pct: 21 },
  { nome: "Verde", pct: 14 },
];

export function Birdy() {
  const { t } = useLingua();
  const produto = acharProduto("birdy")!;
  const hero = useAoEntrar<HTMLElement>({ filhos: ".b-sobe", passo: 90, limiar: 0 });
  const metricas = useAoEntrar<HTMLElement>({ filhos: ".b-metrica", passo: 80 });
  const especies = useAoEntrar<HTMLUListElement>({ filhos: "li", passo: 45 });
  const cruza = useAoEntrar<HTMLElement>({ filhos: ".b-anima", passo: 90 });

  return (
    <div className="b-site">
      <div className="grao" aria-hidden="true" />
      <a className="pular" href="#conteudo">
        Skip to content
      </a>

      <Menu
        itens={[
          { label: "LUMI", link: "/lumi" },
          { label: "Postly", link: "/postly" },
          { label: "VYRO", link: "/" },
        ]}
        marca={
          <span className="b-marca">
            <Wordmark altura={15} comSimbolo={false} />
            <i aria-hidden="true" />
            Birdy
          </span>
        }
        camadas={["#0d2216", "#143a24"]}
        corBotao="#e6f0e4"
        corBotaoAberto="#e6f0e4"
        acento="#a8ff3e"
      />

      <main id="conteudo">
        <header className="b-hero" ref={hero}>
          {/* Textura orgânica, dessaturada: verde de mata, não neon.
              AoVivo desmonta o shader assim que o herói sai da tela — sem
              isso ele continuaria rodando para sempre atrás do resto da
              página, que é bem mais longa que a primeira dobra. */}
          <div className="palco b-palco" aria-hidden="true">
            <AoVivo>
              <Balatro
                color1="#0c3a20"
                color2="#16603a"
                color3="#07160d"
                contrast={2.1}
                lighting={0.24}
                spinSpeed={2.4}
                spinAmount={0.16}
                pixelFilter={620}
                isRotate={false}
                mouseInteraction={false}
              />
            </AoVivo>
          </div>

          <div className="b-env b-hero-grade">
            <div className="b-hero-texto">
              <p className="b-eyebrow b-sobe">
                <Simbolo tamanho={13} cor="currentColor" espessura={5} />
                {t(T.eyebrow)}
              </p>
              <h1 className="b-h1 b-sobe">
                <span>{t(T.titulo)}</span>
                <em>{t(T.tituloB)}</em>
              </h1>
              <p className="b-sub b-sobe">{t(T.sub)}</p>
              <div className="b-acoes b-sobe">
                <a className="b-bt b-bt-cheio" href="#telas">
                  {t(T.cta)}
                  <i aria-hidden="true">↓</i>
                </a>
                <span className="b-plataformas">{t(T.plataformas)}</span>
              </div>
            </div>

            <div className="b-hero-fone b-sobe">
              <Fone
                src={arq("/telas/birdy/home.webp")}
                alt="Birdy — início"
                largura={TELA.birdy.l}
                altura={TELA.birdy.a}
                escala="min(286px, 74vw)"
                carcaca="#0b1f14"
                eager
              />
            </div>
          </div>

          <GradualBlur target="parent" position="bottom" height="6rem" strength={1.8} divCount={5} curve="bezier" />
        </header>

        {/* A ave: captura real do app, virando água sob o ponteiro. A foto é
             retrato; numa faixa larga o corte comia a cabeça do bicho. */}
        <section className="b-ave">
          <div className="b-env b-ave-grade">
            <div className="b-ave-quadro">
              <AoVivo>
                <RippleDistortion
                  src={arq("/telas/birdy/ave.webp")}
                  grayscale={false}
                  tint="#4ade80"
                  tintAmount={0.18}
                  strength={0.16}
                  brushSize={190}
                  rings={3}
                  swirl={0.8}
                  spread={4}
                  fade={2.6}
                  spacing={18}
                  glint={0.15}
                  quality="medium"
                  trigger="both"
                />
              </AoVivo>
            </div>
            <div className="b-ave-copy">
              <p className="b-rotulo">{t(T.aveRotulo)}</p>
              <h2 className="b-ave-h">{t(T.aveH)}</h2>
              <p className="b-ave-p">{t(T.aveTexto)}</p>
              <p className="b-ave-dica">{t(T.aveDica)}</p>
            </div>
          </div>
        </section>

        <section className="b-metricas" ref={metricas}>
          <div className="b-env b-metricas-grade">
            {produto.numeros.map((n) => (
              <div key={n.rotulo.en} className="b-metrica">
                <strong>{n.valor}</strong>
                <span>{t(n.rotulo)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A galeria anda de lado enquanto a página rola: o plantel sendo
             folheado. É o ritmo do Birdy — a LUMI usa uma linha do tempo e o
             Postly usa abas de terminal, de propósito. */}
        <section className="b-galeria-secao" id="telas">
          <GaleriaHorizontal className="b-galeria">
            {/* O título entra na própria trilha: a leitura já começa deitada, e
                a galeria ganha curso suficiente para o movimento valer. */}
            <div className="b-galeria-abre">
              <p className="b-rotulo">{t(T.passosTitulo)}</p>
              <h2 className="b-h2">{t(T.passosCabeca)}</h2>
              <span className="b-galeria-dica" aria-hidden="true">
                {t(T.galDica)} →
              </span>
            </div>
            {T.passos.map((pp) => (
              <figure key={pp.n} className="b-peca">
                <Fone
                  src={pp.img}
                  alt={`Birdy — ${t(pp.t)}`}
                  largura={TELA.birdy.l}
                  altura={TELA.birdy.a}
                  escala="min(260px, 62vw)"
                  carcaca="#0b1f14"
                />
                <figcaption>
                  <span className="b-peca-n">{pp.n}</span>
                  <h3>{t(pp.t)}</h3>
                  <p>{t(pp.d)}</p>
                </figcaption>
              </figure>
            ))}
          </GaleriaHorizontal>
        </section>

        {/* O simulador de cruzamento: a pergunta que o criador faz de verdade. */}
        <section className="b-gen" ref={cruza}>
          <div className="b-env">
            <p className="b-rotulo">{t(T.genRotulo)}</p>
            <h2 className="b-h2">{t(T.genCabeca)}</h2>

            <div className="b-cruza">
              <div className="b-pais">
                {PAIS.map((pa) => (
                  <article key={pa.nome} className="b-pai b-anima">
                    <span className="b-pai-papel">{t(pa.papel === "pai" ? T.genPai : T.genMae)}</span>
                    <img src={pa.img} alt="" width={240} height={240} loading="lazy" decoding="async" />
                    <strong>{pa.nome}</strong>
                    <span className="b-pai-gene">{pa.gene}</span>
                  </article>
                ))}
                <span className="b-cruza-sinal" aria-hidden="true">
                  ×
                </span>
              </div>

              <div className="b-prole">
                <p className="b-prole-rotulo">{t(T.genSaida)}</p>
                <ul>
                  {PROLE.map((pr) => (
                    <li key={pr.nome} className="b-anima">
                      <span className="b-prole-nome">{pr.nome}</span>
                      <span className="b-barra" aria-hidden="true">
                        <i style={{ width: `${pr.pct}%` }} />
                      </span>
                      <span className="b-prole-pct">{pr.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="b-gen-rodape">{t(T.genRodape)}</p>
          </div>
        </section>

        {/* O desktop, com o render real do produto. */}
        <section className="b-desk">
          <div className="b-env b-desk-grade">
            <div className="b-desk-texto">
              <p className="b-rotulo">{t(T.deskRotulo)}</p>
              <h2 className="b-h2">{t(T.deskCabeca)}</h2>
              <p className="b-desk-p">{t(T.deskTexto)}</p>
              <span className="b-desk-selo">{t(T.deskSelo)}</span>
            </div>
            <figure className="b-desk-arte">
              <img
                src={arq("/telas/birdy/desktop.webp")}
                alt="Birdy no desktop — financeiro"
                width={1100}
                height={1160}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="b-genetica">
          <div className="b-env">
            <h2 className="b-gen-titulo">{t(T.genTitulo)}</h2>
            <p className="b-gen-texto">{t(T.genTexto)}</p>
            <ul className="b-especies" ref={especies}>
              {T.especies.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="b-rodape">
        <div className="b-env">
          <h2 className="b-fechar">{t(T.fecharTitulo)}</h2>
          <p className="b-fechar-texto">{t(T.fecharTexto)}</p>
          <div className="b-rodape-links">
            <Link para="/">VYRO</Link>
            <Link para="/lumi">LUMI</Link>
            <Link para="/postly">Postly</Link>
            <a href="mailto:joaopedroteixeirareis@gmail.com">joaopedroteixeirareis@gmail.com</a>
          </div>
          <p className="b-assina">Birdy by VYRO · ©2026</p>
        </div>
      </footer>

      <Dique />
    </div>
  );
}
