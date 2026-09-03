import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * A marca da VYRO desenhada em partículas.
 *
 * O símbolo é rasterizado uma vez num canvas fora da tela; cada pixel aceso do
 * traço vira um ponto. Parada, a nuvem nunca fica quieta: cada ponto tem
 * frequência, fase e amplitude próprias nos dois eixos, o conjunto inteiro
 * deriva devagar como se boiasse, gira de leve, e todo o bando se inclina na
 * direção do ponteiro — um paralaxe de grupo por cima da fuga individual de
 * cada ponto. Conforme a página rola, cada um sai pela sua direção e a marca
 * se desfaz pelo fundo inteiro, não só pela caixa onde ela mora.
 *
 * O canvas pode ser bem maior que a marca (`tamanho` controla o desenho,
 * `ancoraX`/`ancoraY` onde ele fica dentro do canvas): é assim que o
 * desfazimento alcança a tela toda em vez de ficar preso numa caixa pequena.
 *
 * Sem listener de scroll: o progresso é lido de um `getBoundingClientRect`
 * dentro do próprio quadro, então não existe handler competindo com a rolagem.
 * O laço para quando a seção sai da tela, e nem começa se o usuário pediu menos
 * movimento — nesse caso a marca fica desenhada e quieta.
 */

const TRACOS = [
  "M32 14 L17 26 L17 58 L50 87 L83 58 L83 26 L68 14",
  "M17 26 L50 47 L83 26",
  "M32 14 L50 47 L68 14",
  "M32 14 L50 87 L68 14",
];

type Ponto = {
  x: number;
  y: number;
  /** Direção e distância que este ponto percorre ao se desfazer. */
  dx: number;
  dy: number;
  /** Respiração parada: frequência, fase e amplitude por eixo. */
  fx: number;
  fy: number;
  px: number;
  py: number;
  ax: number;
  ay: number;
  /** Segundo harmônico, mais rápido e mais fraco: tira a nuvem do ritmo de metrônomo. */
  f2: number;
  p2: number;
  /** Cintilância. */
  fb: number;
  pb: number;
  r: number;
  atraso: number;
  /** Deslocamento acumulado da fuga do ponteiro, suavizado entre quadros. */
  ex: number;
  ey: number;
};

type Props = {
  /** Cor dos pontos. */
  cor?: string;
  /** Alvo de pontos. O passo de amostragem se ajusta para chegar perto. */
  quantidade?: number;
  /** Quanto o scroll empurra os pontos, em fração do maior lado do canvas. */
  dispersao?: number;
  /** Tamanho do desenho, em fração do menor lado do canvas. */
  tamanho?: number;
  /** Onde o centro da marca fica dentro do canvas, em fração 0–1. */
  ancoraX?: number;
  ancoraY?: number;
  /**
   * Elemento que define o progresso do desfazimento. Serve para prender o
   * herói: a marca fica dentro de um painel sticky, que não se move, então o
   * curso tem que vir da seção alta por fora dele.
   */
  refCurso?: RefObject<HTMLElement | null>;
  className?: string;
};

export function MarcaParticulas({
  cor = "#17150f",
  quantidade = 2200,
  dispersao = 0.95,
  tamanho = 0.86,
  ancoraX = 0.5,
  ancoraY = 0.5,
  refCurso,
  className,
}: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const raiz = caixa.current;
    const canvas = tela.current;
    if (!raiz || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let pontos: Ponto[] = [];
    let larg = 0;
    let alt = 0;
    let ladoMarca = 0;
    let ancoraPxX = 0;
    let ancoraPxY = 0;
    let quadro = 0;
    let visivel = true;
    const inicio = performance.now();

    // Ponteiro em coordenadas do canvas. Fora da caixa fica nulo.
    let pt: { x: number; y: number } | null = null;
    // Paralaxe de grupo: alvo e valor suavizado, atualizados a cada quadro.
    let derivaX = 0;
    let derivaY = 0;

    function amostrar(l: number, a: number): Ponto[] {
      ladoMarca = Math.min(l, a) * tamanho;
      ancoraPxX = l * ancoraX;
      ancoraPxY = a * ancoraY;

      const off = document.createElement("canvas");
      // Amostragem numa resolução fixa: o número de pontos não pode depender
      // do tamanho da janela, senão a marca muda de densidade ao redimensionar.
      const res = 260;
      off.width = res;
      off.height = res;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];

      const escalaTraco = res / 100;
      octx.scale(escalaTraco, escalaTraco);
      octx.strokeStyle = "#000";
      octx.lineWidth = 3.6;
      octx.lineCap = "round";
      octx.lineJoin = "round";
      for (const d of TRACOS) octx.stroke(new Path2D(d));

      const dados = octx.getImageData(0, 0, res, res).data;
      const acesos: Array<[number, number]> = [];
      for (let y = 0; y < res; y += 1) {
        for (let x = 0; x < res; x += 1) {
          if (dados[(y * res + x) * 4 + 3] > 96) acesos.push([x, y]);
        }
      }
      if (acesos.length === 0) return [];

      const passo = Math.max(1, Math.round(acesos.length / quantidade));
      // O raio de dispersão vem do canvas inteiro, não do tamanho da marca:
      // é o que deixa o desfazimento alcançar a tela toda, mesmo com um
      // desenho pequeno no meio dela.
      const raioMundo = Math.max(l, a) * dispersao;
      const saida: Ponto[] = [];
      for (let i = 0; i < acesos.length; i += passo) {
        const [ax, ay] = acesos[i];
        // Jitter de meio pixel: sem ele a nuvem vira uma grade perfeita e
        // aparece o quadriculado da amostragem.
        const x = ancoraPxX + ((ax + Math.random() - 0.5) / res - 0.5) * ladoMarca;
        const y = ancoraPxY + ((ay + Math.random() - 0.5) / res - 0.5) * ladoMarca;
        // A dispersão sai da âncora, então a marca abre como fumaça em vez de
        // escorregar toda para o mesmo lado.
        const ang = Math.atan2(y - ancoraPxY, x - ancoraPxX) + (Math.random() - 0.5) * 1.6;
        const forca = (0.3 + Math.random() * 1.35) * raioMundo;
        saida.push({
          x,
          y,
          dx: Math.cos(ang) * forca,
          dy: Math.sin(ang) * forca - raioMundo * 0.1 * Math.random(),
          // Frequências diferentes nos dois eixos desenham uma pequena figura
          // de Lissajous por ponto: a nuvem nunca pulsa em bloco.
          fx: 0.2 + Math.random() * 0.5,
          fy: 0.16 + Math.random() * 0.46,
          px: Math.random() * Math.PI * 2,
          py: Math.random() * Math.PI * 2,
          ax: (2.2 + Math.random() * 5.2) * (ladoMarca / 464),
          ay: (1.9 + Math.random() * 4.6) * (ladoMarca / 464),
          f2: 0.7 + Math.random() * 1.3,
          p2: Math.random() * Math.PI * 2,
          fb: 0.5 + Math.random() * 1.1,
          pb: Math.random() * Math.PI * 2,
          r: 0.68 + Math.random() * 0.95,
          atraso: Math.random() * 0.42,
          ex: 0,
          ey: 0,
        });
      }
      return saida;
    }

    function medir() {
      const r = raiz!.getBoundingClientRect();
      larg = Math.max(1, r.width);
      alt = Math.max(1, r.height);
      canvas!.width = Math.round(larg * dpr);
      canvas!.height = Math.round(alt * dpr);
      canvas!.style.width = `${larg}px`;
      canvas!.style.height = `${alt}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      pontos = amostrar(larg, alt);
    }

    function progresso(): number {
      const alvo = refCurso?.current ?? raiz!;
      const r = alvo.getBoundingClientRect();
      // 0 com a seção no topo; 1 quando ela já entregou todo o próprio curso.
      const curso = Math.max(1, r.height - window.innerHeight);
      return Math.min(1, Math.max(0, -r.top / curso));
    }

    function pintar(agora: number) {
      const t = (agora - inicio) / 1000;
      const p = progresso();

      // Um giro lento do conjunto inteiro, de pouco mais de um grau para cada lado.
      const giro = reduzido ? 0 : Math.sin(t * 0.15) * 0.02;
      const cosG = Math.cos(giro);
      const senG = Math.sin(giro);
      // E uma respiração de escala: quase imperceptível sozinha, mas junto com
      // o giro e a deriva tira a nuvem do estado de decalque.
      const escala = reduzido ? 1 : 1 + Math.sin(t * 0.21) * 0.016;
      // Deriva lenta de duas frequências somadas: um vaguear orgânico, não um
      // seno único e previsível.
      const derivaLentaX = reduzido ? 0 : Math.sin(t * 0.09) * 10 + Math.sin(t * 0.031 + 1.7) * 6;
      const derivaLentaY = reduzido ? 0 : Math.cos(t * 0.076) * 8 + Math.sin(t * 0.024 + 0.6) * 5;

      // Paralaxe de grupo: o bando inteiro se inclina para perto do ponteiro,
      // com retorno suave quando ele sai. Separado da fuga por ponto, que é local.
      const alvoDerivaX = pt ? ((pt.x - ancoraPxX) / Math.max(larg, 1)) * 34 : 0;
      const alvoDerivaY = pt ? ((pt.y - ancoraPxY) / Math.max(alt, 1)) * 26 : 0;
      derivaX += (alvoDerivaX - derivaX) * 0.05;
      derivaY += (alvoDerivaY - derivaY) * 0.05;

      // Fuga individual: um raio pequeno, proporcional ao desenho — é um
      // empurrão nos traços, não uma cratera que apaga o miolo da marca.
      const raioFuga = ladoMarca * 0.17;
      const raio2 = raioFuga * raioFuga;

      ctx!.clearRect(0, 0, larg, alt);
      ctx!.fillStyle = cor;

      for (const q of pontos) {
        // Cada ponto começa a se desfazer no seu próprio tempo.
        const local = Math.min(1, Math.max(0, (p - q.atraso) / (1 - q.atraso)));
        const solto = local * local;
        const vivo = 1 - solto;

        // Posição de repouso, girada e respirada em torno da âncora.
        const rx = (q.x - ancoraPxX) * escala;
        const ry = (q.y - ancoraPxY) * escala;
        let x = ancoraPxX + rx * cosG - ry * senG + derivaLentaX;
        let y = ancoraPxY + rx * senG + ry * cosG + derivaLentaY;

        if (!reduzido) {
          x += Math.sin(t * q.fx + q.px) * q.ax * vivo + Math.sin(t * q.fx * q.f2 + q.p2) * q.ax * 0.22 * vivo;
          y += Math.cos(t * q.fy + q.py) * q.ay * vivo + Math.cos(t * q.fy * q.f2 + q.p2 * 1.3) * q.ay * 0.22 * vivo;
        }

        // Fuga local do ponteiro, com retorno suave. Só enquanto a marca está inteira.
        let alvoEx = 0;
        let alvoEy = 0;
        if (pt && vivo > 0.05) {
          const vx = x - pt.x;
          const vy = y - pt.y;
          const d2 = vx * vx + vy * vy;
          if (d2 < raio2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const forcaLocal = (1 - d / raioFuga) ** 2 * raioFuga * 0.5;
            alvoEx = (vx / d) * forcaLocal;
            alvoEy = (vy / d) * forcaLocal;
          }
        }
        q.ex += (alvoEx - q.ex) * 0.12;
        q.ey += (alvoEy - q.ey) * 0.12;

        x += q.ex * vivo + derivaX * vivo;
        y += q.ey * vivo + derivaY * vivo;

        x += q.dx * solto;
        y += q.dy * solto;

        // Cintilância: os pontos não têm todos o mesmo peso ao mesmo tempo.
        const brilho = reduzido ? 1 : 0.68 + Math.sin(t * q.fb + q.pb) * 0.32;
        const a = vivo * vivo * brilho;
        if (a <= 0.012) continue;
        ctx!.globalAlpha = Math.min(1, a);
        ctx!.beginPath();
        ctx!.arc(x, y, q.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function laco(agora: number) {
      if (visivel) pintar(agora);
      quadro = requestAnimationFrame(laco);
    }

    medir();

    // O ponteiro é lido em passive: ele não cancela nem atrasa a rolagem.
    const mover = (e: PointerEvent) => {
      const r = raiz!.getBoundingClientRect();
      pt = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const sair = () => {
      pt = null;
    };
    // Escuta na janela porque o canvas tem `pointer-events: none` e a marca
    // deve reagir ao ponteiro passando por perto, não só exatamente em cima.
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerleave", sair, { passive: true });

    if (reduzido) {
      pintar(performance.now());
    } else {
      quadro = requestAnimationFrame(laco);
    }

    const obs = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    obs.observe(raiz);

    const ro = new ResizeObserver(() => {
      medir();
      if (reduzido) pintar(performance.now());
    });
    ro.observe(raiz);

    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerleave", sair);
      obs.disconnect();
      ro.disconnect();
    };
  }, [cor, quantidade, dispersao, tamanho, ancoraX, ancoraY, refCurso]);

  return (
    <div ref={caixa} className={`particulas${className ? ` ${className}` : ""}`} aria-hidden="true">
      <canvas ref={tela} />
    </div>
  );
}
