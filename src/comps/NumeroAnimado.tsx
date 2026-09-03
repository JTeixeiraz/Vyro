import { useEffect, useRef, useState } from "react";

/**
 * Um número que conta até o valor final quando entra na tela.
 *
 * Só dispara uma vez, com um IntersectionObserver próprio — os números de uma
 * seção de estatísticas são poucos, então cada um ter o seu observador é mais
 * simples do que orquestrar um estado compartilhado. `prefers-reduced-motion`
 * pula direto para o valor final.
 */

type Props = {
  /** O valor final, já formatado como vai aparecer ("941", "7", "1.023"). */
  valor: string;
  /** Duração da contagem, em ms. */
  duracao?: number;
  className?: string;
};

export function NumeroAnimado({ valor, duracao = 1100, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [texto, setTexto] = useState(valor);

  useEffect(() => {
    const no = ref.current;
    if (!no) return;

    // Só a parte numérica conta; um separador de milhar ou sufixo não-dígito
    // (como em "1.023" ou "MIT") atravessa como está.
    const casa = valor.match(/\d[\d.]*\d|\d/);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !casa) {
      setTexto(valor);
      return;
    }

    const alvoStr = casa[0];
    const alvo = Number(alvoStr.replace(/\./g, ""));
    if (!Number.isFinite(alvo) || alvo <= 0) {
      setTexto(valor);
      return;
    }

    const prefixo = valor.slice(0, casa.index);
    const sufixo = valor.slice((casa.index ?? 0) + alvoStr.length);
    const temPonto = alvoStr.includes(".");

    let quadro = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          const p = Math.min(1, (agora - inicio) / duracao);
          // easeOutExpo: rápido no começo, assenta devagar no valor final.
          const suave = p >= 1 ? 1 : 1 - 2 ** (-10 * p);
          const n = Math.round(alvo * suave);
          const corpo = temPonto ? n.toLocaleString("pt-BR") : String(n);
          setTexto(`${prefixo}${corpo}${sufixo}`);
          if (p < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );
    obs.observe(no);
    return () => {
      cancelAnimationFrame(quadro);
      obs.disconnect();
    };
  }, [valor, duracao]);

  return (
    <span ref={ref} className={className}>
      {texto}
    </span>
  );
}
