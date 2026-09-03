import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRota } from "../lib/rota";
import { useLingua } from "../lib/i18n";
import { arq, rota as comBase } from "../lib/caminho";
import StaggeredMenu from "../rb/StaggeredMenu";

type Item = { label: string; link: string; ariaLabel?: string };

type MenuProps = {
  itens: Item[];
  /** Marca desenhada à esquerda. Cada site passa a sua. */
  marca: ReactNode;
  /** Cores das camadas que entram escalonadas atrás do painel. */
  camadas?: string[];
  corBotao?: string;
  corBotaoAberto?: string;
  acento?: string;
  className?: string;
};

/**
 * A navegação.
 *
 * O StaggeredMenu do React Bits cuida do painel e da animação escalonada. Duas
 * costuras são nossas: os links dele são âncoras cruas, que dariam reload
 * completo no roteador de History API, então o clique é interceptado aqui; e o
 * logo embutido é escondido no CSS para a marca e o seletor de idioma ficarem
 * numa barra própria, que é onde eles pertencem.
 */
export function Menu({
  itens,
  marca,
  camadas = ["#1e1d16", "#2c2a20"],
  corBotao = "#17150f",
  corBotaoAberto = "#f2efe7",
  acento = "#c1ff72",
  className,
}: MenuProps) {
  const { ir } = useRota();
  const { lingua, trocar } = useLingua();
  const caixa = useRef<HTMLDivElement>(null);
  const sentinela = useRef<HTMLDivElement>(null);
  const [preso, setPreso] = useState(false);

  // Sentinela no topo em vez de listener de scroll: o observador dispara duas
  // vezes na vida da página, o listener dispararia a cada quadro.
  useEffect(() => {
    const no = sentinela.current;
    if (!no) return;
    const obs = new IntersectionObserver(([e]) => setPreso(!e.isIntersecting), { threshold: 0 });
    obs.observe(no);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`navb${className ? ` ${className}` : ""}`}
      ref={caixa}
      onClickCapture={(e) => {
        const alvo = (e.target as HTMLElement).closest<HTMLAnchorElement>("a.sm-panel-item");
        if (!alvo) return;
        const destino = alvo.getAttribute("href");
        if (!destino || /^(https?:|mailto:)/.test(destino)) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        ir(destino);
      }}
    >
      <div className="navb-sentinela" ref={sentinela} aria-hidden="true" />
      <div className="navb-barra" data-preso={preso || undefined}>
        <a
          className="navb-marca"
          href="/"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            ir("/");
          }}
        >
          {marca}
        </a>
        <div className="navb-lingua" role="group" aria-label="Language">
          {(["en", "pt"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => trocar(l)}
              className={lingua === l ? "e-ativa" : undefined}
              aria-pressed={lingua === l}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <StaggeredMenu
        position="right"
        isFixed
        colors={camadas}
        // O StaggeredMenu monta âncoras cruas: sem a base aqui, abrir em nova
        // aba (ou clique do meio) cairia fora do /Vyro/ e daria 404. O clique
        // normal continua interceptado abaixo e não recarrega a página.
        items={itens.map((it) => ({ ...it, link: comBase(it.link) }))}
        displaySocials={false}
        displayItemNumbering
        logoUrl={arq("/marca.svg")}
        menuButtonColor={corBotao}
        openMenuButtonColor={corBotaoAberto}
        accentColor={acento}
      />
    </div>
  );
}
