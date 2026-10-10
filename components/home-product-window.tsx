type HomeProductWindowProps = {
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export function HomeProductWindow({ label, src, width, height, alt }: HomeProductWindowProps) {
  return (
    <figure className="home-product-window">
      <div className="home-product-window__bar">
        <span aria-hidden="true">● ● ●</span><span>{label}</span>
      </div>
      {/* Preserve the actual product screen and its original proportions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
      <figcaption>Actual product screen · Demonstration data</figcaption>
    </figure>
  );
}
