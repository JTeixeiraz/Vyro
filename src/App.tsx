import { lazy, Suspense } from "react";
import { Vyro } from "./sites/vyro/Vyro";
import { useRota } from "./lib/rota";

// Cada site de produto carrega sob demanda: quem abre a holding não baixa as
// cenas 3D dos outros três.
const Birdy = lazy(() => import("./sites/birdy/Birdy").then((m) => ({ default: m.Birdy })));
const Lumi = lazy(() => import("./sites/lumi/Lumi").then((m) => ({ default: m.Lumi })));
const Postly = lazy(() => import("./sites/postly/Postly").then((m) => ({ default: m.Postly })));

/**
 * Cada rota é um site inteiro, com identidade própria: a holding e um por
 * produto. Nada de layout compartilhado além do roteador e do idioma.
 */
export function App() {
  const { caminho } = useRota();

  if (caminho === "/") return <Vyro />;

  const site =
    caminho === "/birdy" ? <Birdy /> : caminho === "/lumi" ? <Lumi /> : caminho === "/postly" ? <Postly /> : <Vyro />;

  // O fundo do carregamento acompanha o site que está chegando, para a troca
  // não piscar branco no meio do caminho.
  const fundo = caminho === "/lumi" ? "#f3f1ed" : caminho === "/birdy" ? "#06120a" : "#0a0c09";
  return <Suspense fallback={<div style={{ minHeight: "100dvh", background: fundo }} />}>{site}</Suspense>;
}
