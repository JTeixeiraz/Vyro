import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Fone } from "../comps/Aparelho";

/**
 * Primitivas de scroll compartilhadas pelos quatro sites. A identidade de cada
 * um vem do CSS; o comportamento é o mesmo, e é o que o usuário reconhece:
 * o painel do produto se endireita conforme entra na tela.
 */

type PainelProps = {
  children: ReactNode;
  /** Inclinação inicial, em graus. */
  inclinacao?: number;
  className?: string;
};

/**
 * O painel entra deitado e se levanta conforme sobe na tela. É a única peça de
 * movimento pesada da página, e ela só anima transform.
 */
export function PainelScroll({ children, inclinacao = 20, className }: PainelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const rotateX = useTransform(scrollYProgress, [0, 1], reduzido ? [0, 0] : [inclinacao, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduzido ? [1, 1] : [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], reduzido ? [1, 1] : [0.4, 1]);

  return (
    <div ref={ref} className={`painel-palco${className ? ` ${className}` : ""}`}>
      <motion.div style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }} className="painel-corpo">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Os pontos de um useTransform precisam ficar dentro de [0,1] e em ordem
 * crescente estrita. Com quatro passos o intervalo é 0,25 e as folgas que eu
 * somava estouravam as duas regras.
 */
function faixa(pontos: number[]): number[] {
  const saida: number[] = [];
  for (const p of pontos) {
    const preso = Math.min(1, Math.max(0, p));
    const anterior = saida[saida.length - 1];
    saida.push(anterior === undefined ? preso : Math.max(preso, anterior + 1e-4));
  }
  return saida.map((v) => Math.min(1, v));
}

type Passo = {
  n: string;
  titulo: string;
  texto: string;
  img: string;
  alt: string;
};

type Aparelho = {
  largura: number;
  altura: number;
  carcaca?: string;
  escala?: string;
};

type HistoriaProps = {
  passos: Passo[];
  /** Formato do painel da direita. */
  formato?: "fone" | "tela";
  /** Com isto a captura troca dentro de uma moldura real, sem corte. */
  aparelho?: Aparelho;
  className?: string;
};

/**
 * História fixa: a coluna da direita fica presa enquanto a lista da esquerda
 * rola, e a imagem troca no passo que estiver no meio da tela. Substitui três
 * parágrafos por três telas.
 */
export function HistoriaFixa({ passos, formato = "tela", aparelho, className }: HistoriaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={`historia${className ? ` ${className}` : ""}`}>
      <div className="historia-lista">
        {passos.map((p, i) => (
          <PassoItem key={p.n} passo={p} indice={i} total={passos.length} progresso={scrollYProgress} />
        ))}
      </div>

      <div className="historia-fixa">
        <div className={`historia-quadro historia-${formato}`}>
          {passos.map((p, i) => (
            <ImagemPasso
              key={p.n}
              src={p.img}
              alt={p.alt}
              indice={i}
              total={passos.length}
              progresso={scrollYProgress}
              aparelho={aparelho}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PassoItem({
  passo,
  indice,
  total,
  progresso,
}: {
  passo: Passo;
  indice: number;
  total: number;
  progresso: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const inicio = indice / total;
  const fim = (indice + 1) / total;
  const meio = (inicio + fim) / 2;
  const folga = 0.5 / total;
  // Aceso no seu trecho, apagado fora dele.
  const opacity = useTransform(progresso, faixa([inicio - folga, meio, fim + folga * 0.2]), [0.3, 1, 0.3]);

  return (
    <motion.div style={{ opacity }} className="historia-passo">
      <span className="historia-n">{passo.n}</span>
      <h3>{passo.titulo}</h3>
      <p>{passo.texto}</p>
    </motion.div>
  );
}

function ImagemPasso({
  src,
  alt,
  indice,
  total,
  progresso,
  aparelho,
}: {
  src: string;
  alt: string;
  indice: number;
  total: number;
  progresso: ReturnType<typeof useScroll>["scrollYProgress"];
  aparelho?: Aparelho;
}) {
  const inicio = indice / total;
  const fim = (indice + 1) / total;
  const borda = 0.28 / total;
  const opacity = useTransform(
    progresso,
    faixa([inicio - borda, inicio + borda, fim - borda, fim + borda]),
    indice === 0 ? [1, 1, 1, 0] : indice === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  if (aparelho) {
    return (
      <motion.div style={{ opacity }}>
        <Fone
          src={src}
          alt={alt}
          largura={aparelho.largura}
          altura={aparelho.altura}
          carcaca={aparelho.carcaca}
          escala={aparelho.escala}
          eager={indice === 0}
        />
      </motion.div>
    );
  }

  return (
    <motion.img
      style={{ opacity }}
      src={src}
      alt={alt}
      loading={indice === 0 ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
