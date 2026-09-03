import { useEffect, useRef, useState } from "react";

/**
 * O símbolo VYRO. Quatro traçados sobre a mesma geometria: a silhueta de
 * escudo, o vale superior, as diagonais de ombro e as hastes que descem ao
 * ápice. Desenhado a stroke porque a marca é line-art, não uma forma cheia.
 */

const TRACOS = [
  "M32 14 L17 26 L17 58 L50 87 L83 58 L83 26 L68 14",
  "M17 26 L50 47 L83 26",
  "M32 14 L50 47 L68 14",
  "M32 14 L50 87 L68 14",
];

type SimboloProps = {
  tamanho?: number;
  cor?: string;
  espessura?: number;
  /** Anima o traço se desenhando. Só no herói; em qualquer outro lugar é ruído. */
  desenhar?: boolean;
  className?: string;
};

export function Simbolo({
  tamanho = 40,
  cor = "var(--lime)",
  espessura = 3.4,
  desenhar = false,
  className,
}: SimboloProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [pronto, setPronto] = useState(!desenhar);

  useEffect(() => {
    if (!desenhar) return;
    // A marca já está visível no HTML: o desenho é um enfeite por cima de um
    // estado legítimo, nunca a condição para o logo aparecer.
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) {
      setPronto(true);
      return;
    }
    const id = requestAnimationFrame(() => setPronto(true));
    return () => cancelAnimationFrame(id);
  }, [desenhar]);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 100 100"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke={cor}
      strokeWidth={espessura}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-desenhando={desenhar && !pronto ? "" : undefined}
    >
      {TRACOS.map((d, i) => (
        <path
          key={d}
          d={d}
          className={desenhar ? "traco-marca" : undefined}
          style={desenhar ? { animationDelay: `${140 + i * 160}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

type WordmarkProps = {
  /** Altura da caixa tipográfica em px. */
  altura?: number;
  comSimbolo?: boolean;
  className?: string;
};

export function Wordmark({ altura = 20, comSimbolo = true, className }: WordmarkProps) {
  return (
    <span className={`wordmark${className ? ` ${className}` : ""}`} style={{ fontSize: altura }}>
      {comSimbolo && <Simbolo tamanho={altura * 1.32} espessura={4.2} />}
      <span className="wordmark-texto">VYRO</span>
    </span>
  );
}
