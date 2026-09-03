import { useRota } from "../lib/rota";
import { PRODUTOS } from "../dados/produtos";
import { Simbolo } from "../brand/Marca";
import Dock from "../rb/Dock";

/**
 * O dique: a barra flutuante que troca de produto sem voltar para a holding.
 *
 * Existe por utilidade antes de enfeite — quatro sites separados sem uma ponte
 * entre eles obrigam o visitante a voltar para a home toda vez. O ícone de cada
 * produto é a inicial dele na cor dele, então a barra também é a legenda das
 * cores usadas nos blocos.
 */

const GLIFO: Record<string, string> = { birdy: "B", lumi: "L", postly: "P" };

function Inicial({ letra, cor }: { letra: string; cor: string }) {
  return (
    <span className="dique-glifo" style={{ color: cor }} aria-hidden="true">
      {letra}
    </span>
  );
}

export function Dique() {
  const { ir, caminho } = useRota();

  const itens = [
    {
      icon: <Simbolo tamanho={17} cor="#e9e5da" espessura={5} />,
      label: "VYRO",
      onClick: () => ir("/"),
      className: caminho === "/" ? "dique-atual" : "",
    },
    ...PRODUTOS.map((p) => ({
      icon: <Inicial letra={GLIFO[p.id] ?? p.nome[0]} cor={p.acento} />,
      label: p.nome,
      onClick: () => ir(`/${p.slug}`),
      className: caminho === `/${p.slug}` ? "dique-atual" : "",
    })),
  ];

  return (
    <div className="dique" role="navigation" aria-label="Products">
      <Dock items={itens} panelHeight={58} baseItemSize={40} magnification={62} distance={140} dockHeight={190} />
    </div>
  );
}
