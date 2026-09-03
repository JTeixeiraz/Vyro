// O site tem rotas reais (/birdy, /lumi, /postly). Hospedagem estática devolve
// 404 num refresh direto; copiar o index para 404.html resolve sem servidor.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
console.log("404.html gerado a partir do index.");
