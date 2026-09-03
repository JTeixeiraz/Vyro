import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Rotas reais (/birdy, /lumi) precisam de base absoluta; o build gera um
// 404.html idêntico ao index para que o refresh direto funcione no GitHub Pages.
export default defineConfig({
  plugins: [react()],
  // O site é publicado em github.com/JTeixeiraz/Vyro -> /Vyro/.
  // Trocar isto exige trocar junto os ajudantes de src/lib/caminho.ts.
  base: "/Vyro/",
  build: {
    rollupOptions: {
      // motion e gsap servem os quatro sites; em chunk próprio ficam em cache
      // entre as navegações em vez de serem reavaliados a cada rota. ogl não
      // entra aqui de propósito: só as páginas de produto usam shader, e o
      // Rollup já o separa sozinho para elas.
      output: { manualChunks: { motion: ["motion"], gsap: ["gsap"] } },
    },
  },
});
