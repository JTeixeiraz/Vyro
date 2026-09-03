/// <reference types="vite/client" />
/**
 * O site é publicado no GitHub Pages sob `/Vyro/`, não na raiz do domínio.
 *
 * Vite reescreve sozinho o que passa pelo bundler (imports de CSS e JS), mas
 * não toca em string literal apontando para `public/` — `"/telas/x.webp"`
 * continuaria resolvendo para a raiz do domínio e daria 404. Estes dois
 * ajudantes são a única forma de escrever caminho no projeto.
 */

/** A base em que o site está publicado. Termina sempre com barra. */
export const BASE = import.meta.env.BASE_URL;

/** Caminho de um arquivo de `public/`. Use sempre que apontar para um asset. */
export function arq(caminho: string): string {
  return `${BASE}${caminho.replace(/^\//, "")}`;
}

/** Uma rota interna, já com a base — para `href` e `pushState`. */
export function rota(caminho: string): string {
  const limpo = caminho.replace(/^\//, "");
  return limpo ? `${BASE}${limpo}` : BASE;
}

/** O caminho da rota sem a base, que é o que o roteador compara. */
export function semBase(pathname: string): string {
  const base = BASE.replace(/\/$/, "");
  const cru = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const normal = cru.length > 1 && cru.endsWith("/") ? cru.slice(0, -1) : cru;
  return normal.startsWith("/") ? normal : `/${normal}`;
}
