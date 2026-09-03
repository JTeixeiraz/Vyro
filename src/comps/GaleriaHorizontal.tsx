import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Galeria que anda de lado enquanto a página rola.
 *
 * Existe para dar ao Birdy um ritmo diferente do sticky vertical usado nos
 * outros sites: aqui as telas passam como um plantel sendo folheado, não como
 * uma lista sendo lida.
 *
 * A distância percorrida é medida da trilha real, não chutada em porcentagem:
 * com uma fração fixa a última peça sobrava numa largura e sumia noutra. Como o
 * comprimento da seção é o próprio excedente, a rolagem é 1:1 com o movimento —
 * a página não fica presa num trecho longo que não anda nada.
 *
 * Com `prefers-reduced-motion` vira uma faixa de rolagem horizontal comum, que
 * funciona sem script.
 */

type Props = {
  children: ReactNode;
  className?: string;
};

export function GaleriaHorizontal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trilha = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const [curso, setCurso] = useState(0);

  useEffect(() => {
    const t = trilha.current;
    if (!t || reduzido) return;

    const medir = () => {
      // A trilha é um item flex: ela se dimensiona pelo conteúdo, então o
      // excedente é contra o painel preso, não contra ela mesma.
      const painel = t.parentElement;
      if (!painel) return;
      setCurso(Math.max(0, t.scrollWidth - painel.clientWidth));
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(t);
    // As molduras entram com as imagens ainda carregando; sem isto o curso é
    // medido antes de a trilha ter a largura final.
    window.addEventListener("load", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", medir);
    };
  }, [reduzido]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -curso]);

  if (reduzido) {
    return (
      <div className={`galeria-simples${className ? ` ${className}` : ""}`}>
        <div className="galeria-trilha" ref={trilha}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`galeria${className ? ` ${className}` : ""}`}
      // 100dvh do painel preso mais exatamente o que falta andar de lado.
      style={{ height: `calc(100dvh + ${curso}px)` }}
    >
      <div className="galeria-fixa">
        <motion.div className="galeria-trilha" style={{ x }} ref={trilha}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
