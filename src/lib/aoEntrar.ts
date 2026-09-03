import { useEffect, useRef } from "react";

/**
 * Revelação ao scroll, barata: um IntersectionObserver por elemento raiz, e a
 * animação roda em transform/opacity puros. Nada de listener de scroll, nada de
 * biblioteca, nada de repintura por quadro.
 *
 * O conteúdo já nasce visível no HTML: a classe só é adicionada se o JS rodar,
 * então um erro de script nunca deixa a página em branco.
 */
export function useAoEntrar<T extends HTMLElement = HTMLDivElement>(opcoes?: {
  /** Seletor dos filhos a escalonar. Sem ele, anima o próprio elemento. */
  filhos?: string;
  /** Intervalo entre os filhos, em ms. */
  passo?: number;
  /** Fração visível para disparar. */
  limiar?: number;
}) {
  const ref = useRef<T>(null);
  const { filhos, passo = 70, limiar = 0.16 } = opcoes ?? {};

  useEffect(() => {
    const no = ref.current;
    if (!no) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos: HTMLElement[] = filhos
      ? Array.from(no.querySelectorAll<HTMLElement>(filhos))
      : [no];
    if (alvos.length === 0) return;

    alvos.forEach((el, i) => {
      el.style.setProperty("--atraso", `${i * passo}ms`);
      el.classList.add("aguarda");
    });

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("entrou");
          obs.unobserve(e.target);
        }
      },
      { threshold: limiar, rootMargin: "0px 0px -8% 0px" },
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filhos, passo, limiar]);

  return ref;
}
