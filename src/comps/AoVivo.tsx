import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Zona de antecipação: monta um pouco antes de entrar na tela para não
   * piscar, desmonta um pouco depois de sair.
   */
  margem?: string;
};

/**
 * Monta o shader só enquanto ele faz sentido rodar: perto da tela, e sem
 * `prefers-reduced-motion`. O navegador já pausa `requestAnimationFrame`
 * sozinho quando a aba vai para segundo plano — isso aqui cobre a lacuna que
 * ele não cobre, que é o elemento ter saído da tela por scroll enquanto a aba
 * continua em primeiro plano.
 *
 * Os quatro fundos em WebGL do site (Balatro, LiquidChrome, Ferrofluid,
 * RippleDistortion) são componentes vendorizados do React Bits e rodam para
 * sempre por padrão, mesmo fora de vista. Em vez de editar o código de
 * terceiro, a guarda fica por fora: quando os filhos saem, o React desmonta o
 * componente de verdade — cada um deles cancela o próprio rAF, remove o
 * canvas e perde o contexto WebGL no cleanup, então nada fica preso rodando
 * atrás do conteúdo enquanto o visitante lê o resto da página.
 */
export function AoVivo({ children, className, margem = "35% 0px" }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzido(mq.matches);
    const ouvir = (e: MediaQueryListEvent) => setReduzido(e.matches);
    mq.addEventListener("change", ouvir);
    return () => mq.removeEventListener("change", ouvir);
  }, []);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { rootMargin: margem });
    obs.observe(no);
    return () => obs.disconnect();
  }, [margem]);

  return (
    // `position: absolute; inset: 0` para preencher exatamente o pai — os
    // shaders que este componente guarda vêm de containers como `.palco`, que
    // esperam um filho a 100% de largura e altura. `display: contents` parecia
    // a escolha óbvia para um wrapper que não deve afetar o layout, mas o
    // Chromium nunca reporta interseção para um elemento sem caixa própria: o
    // IntersectionObserver ficaria preso em `false` para sempre, e nenhum dos
    // quatro shaders chegaria a montar. Testado antes de assumir.
    <div ref={raiz} className={className} style={{ position: "absolute", inset: 0 }}>
      {!reduzido && visivel ? children : null}
    </div>
  );
}
