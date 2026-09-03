import { useEffect, useState } from "react";
import { Link } from "../../lib/rota";
import { useLingua } from "../../lib/i18n";
import { useAoEntrar } from "../../lib/aoEntrar";
import { acharProduto } from "../../dados/produtos";
import { SITE } from "../../dados/textos";
import { b } from "../textos-site";
import { Simbolo, Wordmark } from "../../brand/Marca";
import { Janela, TELA } from "../../comps/Aparelho";
import { Menu } from "../../comps/Menu";
import { Dique } from "../../comps/Dique";
import { arq } from "../../lib/caminho";
import { AoVivo } from "../../comps/AoVivo";
import LiquidChrome from "../../rb/LiquidChrome";
import GradualBlur from "../../rb/GradualBlur";
import "./postly.css";

/**
 * Postly — o departamento de marketing local.
 *
 * Escuro, monoespaçado, de terminal: o produto roda na máquina do usuário e o
 * site tem que soar assim. O fundo do herói é o LiquidChrome em cinza, quase
 * sem cor: metal, não arco-íris. O laranja é a única cor, e aparece só em ação.
 */

const CARGOS = [
  { pt: "Diretor Geral", en: "General Director", faz: b("decides where to post", "decide onde publicar"), peso: "alto" },
  { pt: "Gerente de Setor", en: "Sector Manager", faz: b("decides the creative line", "decide a linha criativa"), peso: "alto" },
  { pt: "Criador", en: "Creator", faz: b("writes and makes the piece", "escreve e faz a peça"), peso: "medio" },
  { pt: "Auditor", en: "Auditor", faz: b("approves or sends it back", "aprova ou devolve"), peso: "medio" },
];

const T = {
  eyebrow: b("Open source · MIT", "Open source · MIT"),
  titulo: b("A marketing team", "Um time de marketing"),
  tituloB: b("that runs offline", "que roda offline"),
  sub: b(
    "One sentence in. Four AI roles take turns on local models and hand you the finished post.",
    "Uma frase entra. Quatro cargos de IA se revezam em modelos locais e devolvem o post pronto.",
  ),
  baixar: b("Download", "Baixar"),
  codigo: b("Read the code", "Ver o código"),
  so: b("Linux · macOS · Windows", "Linux · macOS · Windows"),

  revezTitulo: b("The handoff", "O revezamento"),
  revezCabeca: b("One model in memory. Always one.", "Um modelo na memória. Sempre um."),
  revezTexto: b(
    "At each turn it measures free memory, loads the strongest model that fits, takes the answer, unloads it. That is why it runs on an ordinary machine.",
    "A cada turno ele mede a memória livre, sobe o modelo mais forte que couber, pega a resposta e descarrega. É por isso que roda numa máquina comum.",
  ),
  residente: b("in memory", "na memória"),
  descarregado: b("unloaded", "descarregado"),

  telasTitulo: b("Inside", "Por dentro"),
  telasCabeca: b("Four screens, one campaign", "Quatro telas, uma campanha"),
  telas: [
    { n: "01", t: b("Write the goal", "Escreva o objetivo"), d: b("One sentence, and the networks you want.", "Uma frase, e as redes que você quer."), img: arq("/telas/postly/campanha.webp") },
    { n: "02", t: b("Pick the models", "Escolha os modelos"), d: b("37 catalogued. It picks by what fits in RAM.", "37 catalogados. Ele escolhe pelo que cabe na RAM."), img: arq("/telas/postly/modelos.webp") },
    { n: "03", t: b("Watch the context", "Veja o contexto"), d: b("A weighted graph the roles share. No database.", "Um grafo ponderado que os cargos dividem. Sem banco."), img: arq("/telas/postly/cerebro.webp") },
    { n: "04", t: b("Read the result", "Leia o resultado"), d: b("What each post returned, and what comes next.", "O que cada publicação rendeu, e o que vem depois."), img: arq("/telas/postly/auditoria.webp") },
  ],

  limitesTitulo: b("What does not work", "O que não funciona"),
  limites: [
    b("~1.2 tokens/s on a dense 14B without a GPU. A long answer takes tens of minutes.", "~1,2 token/s num denso de 14B sem GPU. Uma resposta longa leva dezenas de minutos."),
    b("Instagram and TikTok change their markup weekly. Selectors break.", "Instagram e TikTok mudam o markup toda semana. Os seletores quebram."),
    b("The vault protects against a backup, not against a program running as you.", "O cofre protege contra backup, não contra um programa rodando como você."),
  ],
  limitesNota: b("The README says this out loud, so the site says it too.", "O README diz isso em voz alta, então o site diz também."),

  entregaRotulo: b("The full story", "A história completa"),
  entregaTitulo: b("Postly has a site of its own", "O Postly tem site próprio"),
  entregaTexto: b(
    "This page is where the studio shows what it built. The product's own site goes deeper: install commands, the model catalogue ranked by real speed on an ordinary machine, the video of a full run, and every limitation written down.",
    "Esta página é onde o estúdio mostra o que construiu. O site do próprio produto vai mais fundo: comandos de instalação, o catálogo de modelos ranqueado pela velocidade real numa máquina comum, o vídeo de uma rodada inteira, e cada limitação escrita.",
  ),
  entregaBt: b("Open the Postly site", "Abrir o site do Postly"),
};

export function Postly() {
  const { t } = useLingua();
  const produto = acharProduto("postly")!;
  const ativo = useTurno(CARGOS.length);
  const [aba, setAba] = useState(0);
  const hero = useAoEntrar<HTMLElement>({ filhos: ".p-sobe", passo: 90, limiar: 0 });
  const limites = useAoEntrar<HTMLUListElement>({ filhos: "li", passo: 80 });
  const numeros = useAoEntrar<HTMLDivElement>({ filhos: ".p-num", passo: 80 });

  return (
    <div className="p-site">
      <div className="grao" aria-hidden="true" />
      <a className="pular" href="#conteudo">
        Skip to content
      </a>

      <Menu
        itens={[
          { label: "Birdy", link: "/birdy" },
          { label: "LUMI", link: "/lumi" },
          { label: "VYRO", link: "/" },
        ]}
        marca={
          <span className="p-marca">
            <Wordmark altura={14} comSimbolo={false} />
            <i aria-hidden="true" />
            postly
          </span>
        }
        camadas={["#1a1c1a", "#2a1d15"]}
        corBotao="#e6e6e2"
        corBotaoAberto="#e6e6e2"
        acento="#e2703a"
      />

      <main id="conteudo">
        <header className="p-hero" ref={hero}>
          {/* Metal escuro em movimento lento. Cinza de propósito: o laranja é
              a única cor do site, e ela é reservada para ação. AoVivo
              desmonta o shader assim que o herói sai da tela pelo scroll. */}
          <div className="palco p-palco" aria-hidden="true">
            <AoVivo>
              <LiquidChrome baseColor={[0.055, 0.06, 0.055]} speed={0.22} amplitude={0.34} frequencyX={2.1} frequencyY={1.4} interactive={false} />
            </AoVivo>
          </div>
          <div className="p-env p-hero-grade">
            <div className="p-hero-texto">
              <p className="p-eyebrow p-sobe">
                <Simbolo tamanho={12} cor="currentColor" espessura={5} />
                {t(T.eyebrow)}
              </p>
              <h1 className="p-h1 p-sobe">
                <span>{t(T.titulo)}</span>
                <em>{t(T.tituloB)}</em>
              </h1>
              <p className="p-sub p-sobe">{t(T.sub)}</p>
              <div className="p-acoes p-sobe">
                <a className="p-bt p-bt-cheio" href={produto.link!.url} target="_blank" rel="noreferrer noopener">
                  {t(T.baixar)}
                </a>
                <a className="p-bt" href={produto.repo!.url} target="_blank" rel="noreferrer noopener">
                  {t(T.codigo)}
                </a>
                <span className="p-so">{t(T.so)}</span>
              </div>
            </div>
          </div>

          <div className="p-hero-janela p-sobe">
            <Janela
              src={arq("/telas/postly/campanha.webp")}
              alt="Postly — campanha"
              largura={TELA.postly.l}
              altura={TELA.postly.a}
              titulo="postly"
              eager
            />
          </div>

          <GradualBlur target="parent" position="bottom" height="6rem" strength={1.8} divCount={5} curve="bezier" />
        </header>

        <section className="p-numeros" ref={numeros}>
          <div className="p-env p-numeros-grade">
            {produto.numeros.map((n) => (
              <div key={n.rotulo.en} className="p-num">
                <strong>{n.valor}</strong>
                <span>{t(n.rotulo)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-revez">
          <div className="p-env">
            <p className="p-rotulo">{t(T.revezTitulo)}</p>
            <h2 className="p-h2">{t(T.revezCabeca)}</h2>
            <ul className="p-cargos">
              {CARGOS.map((c, i) => (
                <li key={c.en} className={i === ativo ? "p-cargo p-cargo-on" : "p-cargo"} data-peso={c.peso}>
                  <span className="p-slot">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{t({ en: c.en, pt: c.pt })}</strong>
                  <span className="p-faz">{t(c.faz)}</span>
                  <span className="p-estado">{i === ativo ? t(T.residente) : t(T.descarregado)}</span>
                </li>
              ))}
            </ul>
            <p className="p-revez-texto">{t(T.revezTexto)}</p>
          </div>
        </section>

        {/* Abas, não sticky: o Postly é uma ferramenta de janela, e trocar de
             tela aqui é o mesmo gesto que trocar de tela no app. */}
        <section className="p-telas">
          <div className="p-env">
            <p className="p-rotulo">{t(T.telasTitulo)}</p>
            <h2 className="p-h2">{t(T.telasCabeca)}</h2>

            <div className="p-abas" role="tablist" aria-label={t(T.telasCabeca)}>
              {T.telas.map((tl, i) => (
                <button
                  key={tl.n}
                  role="tab"
                  type="button"
                  id={`aba-${tl.n}`}
                  aria-selected={i === aba}
                  aria-controls={`painel-${tl.n}`}
                  className={i === aba ? "p-aba p-aba-on" : "p-aba"}
                  onClick={() => setAba(i)}
                >
                  <span className="p-aba-n">{tl.n}</span>
                  {t(tl.t)}
                </button>
              ))}
            </div>

            <div
              className="p-painel"
              role="tabpanel"
              id={`painel-${T.telas[aba].n}`}
              aria-labelledby={`aba-${T.telas[aba].n}`}
            >
              <Janela
                key={T.telas[aba].img}
                src={T.telas[aba].img}
                alt={`Postly — ${t(T.telas[aba].t)}`}
                largura={TELA.postly.l}
                altura={TELA.postly.a}
                titulo={`postly — ${T.telas[aba].n}`}
              />
              <p className="p-painel-nota">{t(T.telas[aba].d)}</p>
            </div>
          </div>
        </section>

        <section className="p-limites">
          <div className="p-env">
            <p className="p-rotulo">{t(T.limitesTitulo)}</p>
            <ul className="p-lista" ref={limites}>
              {T.limites.map((l) => (
                <li key={l.en}>{t(l)}</li>
              ))}
            </ul>
            <p className="p-nota">{t(T.limitesNota)}</p>
          </div>
        </section>
        {/* O Postly é o único dos três com site próprio, e o site dele é mais
            fundo que esta página. Em vez de duplicar, esta seção entrega o
            visitante para lá — e deixa claro qual é o destino canônico. */}
        <section className="p-entrega">
          <div className="p-env">
            <p className="p-rotulo">{t(T.entregaRotulo)}</p>
            <h2 className="p-h2">{t(T.entregaTitulo)}</h2>
            <p className="p-entrega-texto">{t(T.entregaTexto)}</p>
            <div className="p-entrega-acoes">
              <a className="p-bt p-bt-cheio" href={produto.link!.url} target="_blank" rel="noreferrer noopener">
                {t(T.entregaBt)}
                <i aria-hidden="true">↗</i>
              </a>
              <a className="p-bt" href={produto.repo!.url} target="_blank" rel="noreferrer noopener">
                {t(T.codigo)}
                <i aria-hidden="true">↗</i>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-rodape">
        <div className="p-env p-rodape-grade">
          <span className="p-assina">
            <Simbolo tamanho={13} espessura={5} cor="#8b8b83" /> postly by VYRO · © {SITE.ano}
          </span>
          <nav>
            <Link para="/">VYRO</Link>
            <Link para="/birdy">Birdy</Link>
            <Link para="/lumi">LUMI</Link>
            <a href={produto.repo!.url} target="_blank" rel="noreferrer noopener">
              github
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </nav>
        </div>
      </footer>

      <Dique />
    </div>
  );
}

/** O cargo aceso troca sozinho, no ritmo em que um modelo é trocado de verdade. */
function useTurno(total: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % total), 2400);
    return () => clearInterval(id);
  }, [total]);
  return i;
}
