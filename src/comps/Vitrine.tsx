import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "../lib/rota";

/**
 * A vitrine dos produtos.
 *
 * Substitui o FlowingMenu do React Bits, que só sabia fazer uma coisa: trocar o
 * nome por um carrossel de nome + miniatura. A linha aqui abre de verdade —
 * ganha altura, traz a captura numa moldura inclinada, um parágrafo e o botão,
 * com o carrossel continuando a correr no fundo.
 *
 * O que é pesado (as miniaturas do carrossel e a captura grande) só monta na
 * primeira vez que a linha é ativada, e fica montado depois: abrir de novo é
 * instantâneo, e quem nunca passa o mouse numa linha não baixa a imagem dela.
 *
 * No toque não existe hover: abaixo de 900px todas as linhas ficam abertas, que
 * é a leitura correta num celular de qualquer forma.
 */

export type ItemVitrine = {
  id: string;
  nome: string;
  slug: string;
  /** Cor do produto, usada no fio e no rótulo. */
  acento: string;
  tipo: string;
  resumo: string;
  cta: string;
  /** A captura que entra na moldura inclinada. */
  captura: string;
  /** Proporção da captura, para a moldura não cortar nada. */
  largura: number;
  altura: number;
  /** Moldura de celular ou de janela de desktop. */
  moldura: (props: { className?: string }) => ReactNode;
  /** Retrato (celular) ou paisagem (desktop): muda o tamanho do palco. */
  forma: "retrato" | "paisagem";
};

type Props = {
  itens: ItemVitrine[];
  /** Rótulo do índice, ex. "01". */
  className?: string;
};

export function Vitrine({ itens, className }: Props) {
  const [ativo, setAtivo] = useState<number | null>(null);
  // Uma linha já visitada continua montada: reabrir não recarrega nada.
  const visitados = useRef<Set<number>>(new Set());
  const [, forcar] = useState(0);

  const abrir = useCallback((i: number) => {
    if (!visitados.current.has(i)) {
      visitados.current.add(i);
      forcar((n) => n + 1);
    }
    setAtivo(i);
  }, []);

  return (
    <div className={`vit${className ? ` ${className}` : ""}`} onPointerLeave={() => setAtivo(null)}>
      {itens.map((it, i) => {
        const montado = visitados.current.has(i);
        return (
          <article
            key={it.id}
            className="vit-linha"
            data-ativo={ativo === i || undefined}
            data-apagado={ativo !== null && ativo !== i ? "" : undefined}
            data-forma={it.forma}
            style={{ ["--acento" as string]: it.acento }}
            onPointerEnter={(e) => {
              // Sem hover em toque: lá as linhas já estão todas abertas.
              if (e.pointerType === "mouse") abrir(i);
            }}
            onFocusCapture={() => abrir(i)}
          >
            {/* O carrossel continua correndo atrás do conteúdo aberto. */}
            <div className="vit-fundo" aria-hidden="true">
              {montado && (
                <div className="vit-fita">
                  {Array.from({ length: 2 }, (_, copia) => (
                    <div className="vit-fita-parte" key={copia}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <span className="vit-fita-item" key={k}>
                          <span className="vit-fita-nome">{it.nome}</span>
                          <span
                            className="vit-fita-tela"
                            style={{ backgroundImage: `url(${it.captura})` }}
                          />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="vit-frente">
              <div className="vit-cabeca">
                <span className="vit-idx">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="vit-nome">{it.nome}</h3>
                <span className="vit-tipo">{it.tipo}</span>
              </div>

              <div className="vit-corpo">
                <p className="vit-texto">{it.resumo}</p>
                <Link className="vit-bt" para={`/${it.slug}`}>
                  {it.cta}
                  <i aria-hidden="true">→</i>
                </Link>
              </div>

              {/* A moldura entra inclinada em 3D — é o produto virando objeto. */}
              <div className="vit-palco">{montado && <it.moldura className="vit-moldura" />}</div>
            </div>

            <Link className="vit-alvo" para={`/${it.slug}`} aria-label={it.nome} />
          </article>
        );
      })}
    </div>
  );
}
