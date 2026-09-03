import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ProvedorRota } from "./lib/rota";
import { ProvedorLingua } from "./lib/i18n";
import "./estilos/base.css";

createRoot(document.getElementById("raiz")!).render(
  <StrictMode>
    <ProvedorLingua>
      <ProvedorRota>
        <App />
      </ProvedorRota>
    </ProvedorLingua>
  </StrictMode>,
);
