import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { rota as comBase, semBase } from "./caminho";

/**
 * Roteador mínimo sobre a History API. São quatro rotas; uma dependência de
 * roteamento aqui custaria mais do que resolve. O build gera 404.html para que
 * um refresh direto em /birdy continue funcionando em hospedagem estática.
 */

type Ctx = {
  caminho: string;
  ir: (para: string) => void;
};

const Contexto = createContext<Ctx | null>(null);

/** O caminho comparável: sem a base do GitHub Pages e sem barra no fim. */
function normalizar(p: string): string {
  const sem = semBase(p);
  if (sem.length > 1 && sem.endsWith("/")) return sem.slice(0, -1);
  return sem || "/";
}

export function ProvedorRota({ children }: { children: ReactNode }) {
  const [caminho, setCaminho] = useState(() => normalizar(window.location.pathname));

  useEffect(() => {
    const aoVoltar = () => setCaminho(normalizar(window.location.pathname));
    window.addEventListener("popstate", aoVoltar);
    return () => window.removeEventListener("popstate", aoVoltar);
  }, []);

  const ir = useCallback((para: string) => {
    const destino = normalizar(para);
    if (destino === normalizar(window.location.pathname)) return;
    window.history.pushState({}, "", comBase(destino));
    setCaminho(destino);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const valor = useMemo<Ctx>(() => ({ caminho, ir }), [caminho, ir]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useRota(): Ctx {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useRota precisa estar dentro de ProvedorRota.");
  return ctx;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { para: string };

export function Link({ para, children, onClick, ...resto }: LinkProps) {
  const { ir } = useRota();
  const externo = /^https?:/.test(para);

  if (externo) {
    return (
      <a href={para} target="_blank" rel="noreferrer noopener" onClick={onClick} {...resto}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={comBase(para)}
      onClick={(e) => {
        onClick?.(e);
        // Deixa passar clique do meio, ctrl/cmd e abrir em nova aba.
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        // Âncoras na própria página rolam em vez de navegar.
        if (para.startsWith("/#")) {
          const alvo = document.querySelector(para.slice(1));
          if (alvo) {
            alvo.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState({}, "", para.slice(1));
            return;
          }
        }
        ir(para);
      }}
      {...resto}
    >
      {children}
    </a>
  );
}
