import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lingua = "en" | "pt";

export type Bi = { en: string; pt: string };

const CHAVE = "vyro:lingua";

type Ctx = {
  lingua: Lingua;
  trocar: (l: Lingua) => void;
  /** Resolve um par bilíngue para a língua corrente. */
  t: (par: Bi) => string;
};

const Contexto = createContext<Ctx | null>(null);

function inicial(): Lingua {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "en" || salvo === "pt") return salvo;
  } catch {
    // Janela privativa, ou armazenamento bloqueado. O padrão resolve.
  }
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("pt")) {
    return "pt";
  }
  return "en";
}

export function ProvedorLingua({ children }: { children: ReactNode }) {
  const [lingua, setLingua] = useState<Lingua>(inicial);

  useEffect(() => {
    document.documentElement.lang = lingua === "pt" ? "pt-BR" : "en";
  }, [lingua]);

  const trocar = useCallback((l: Lingua) => {
    setLingua(l);
    try {
      localStorage.setItem(CHAVE, l);
    } catch {
      // Preferência some no próximo carregamento. Não é motivo para quebrar.
    }
  }, []);

  const valor = useMemo<Ctx>(
    () => ({ lingua, trocar, t: (par: Bi) => par[lingua] }),
    [lingua, trocar],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useLingua(): Ctx {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useLingua precisa estar dentro de ProvedorLingua.");
  return ctx;
}
