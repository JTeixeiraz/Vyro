/**
 * Molduras de aparelho.
 *
 * O recorte estranho da versão anterior vinha daqui: a moldura tinha uma
 * proporção fixa (1080/2340) e as capturas são 1080x2408 e 1080x2338. Com
 * `object-fit: cover` a diferença virava corte, e o corte caía no meio do
 * conteúdo do app.
 *
 * Agora a proporção da tela vem da própria captura. A moldura se molda à
 * imagem, nunca o contrário, e nada é cortado.
 */

type FoneProps = {
  src: string;
  alt: string;
  /** Dimensões naturais do arquivo. É delas que sai a proporção da tela. */
  largura: number;
  altura: number;
  /** Largura final da moldura no layout. */
  escala?: string;
  /** Cor da carcaça. Cada site pinta a sua. */
  carcaca?: string;
  className?: string;
  eager?: boolean;
};

export function Fone({
  src,
  alt,
  largura,
  altura,
  escala = "min(272px, 66vw)",
  carcaca,
  className,
  eager = false,
}: FoneProps) {
  return (
    <div
      className={`fone${className ? ` ${className}` : ""}`}
      style={{ width: escala, ...(carcaca ? { ["--carcaca" as string]: carcaca } : null) }}
    >
      <div className="fone-casco">
        <i className="fone-bt fone-bt-a" aria-hidden="true" />
        <i className="fone-bt fone-bt-b" aria-hidden="true" />
        <i className="fone-bt fone-bt-c" aria-hidden="true" />
        <div className="fone-tela" style={{ aspectRatio: `${largura} / ${altura}` }}>
          <img
            src={src}
            alt={alt}
            width={largura}
            height={altura}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
          <i className="fone-ilha" aria-hidden="true" />
          <i className="fone-vidro" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

type JanelaProps = {
  src: string;
  alt: string;
  largura: number;
  altura: number;
  titulo?: string;
  className?: string;
  eager?: boolean;
};

/** A janela de desktop do Postly. Mesma regra: a tela herda a proporção do arquivo. */
export function Janela({ src, alt, largura, altura, titulo, className, eager = false }: JanelaProps) {
  return (
    <figure className={`janela${className ? ` ${className}` : ""}`}>
      <div className="janela-barra">
        <span className="janela-luzes" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {titulo && <span className="janela-titulo">{titulo}</span>}
      </div>
      <div className="janela-tela" style={{ aspectRatio: `${largura} / ${altura}` }}>
        <img
          src={src}
          alt={alt}
          width={largura}
          height={altura}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </figure>
  );
}

/** Dimensões reais dos arquivos em /public/telas, para não haver adivinhação. */
export const TELA = {
  birdy: { l: 1080, a: 2408 },
  lumi: { l: 1080, a: 2338 },
  postly: { l: 1440, a: 900 },
  postlyAlta: { l: 1440, a: 1000 },
} as const;
