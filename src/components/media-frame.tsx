import Image from "next/image";

export function MediaFrame({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  position?: string;
}) {
  return (
    <div className={`media-frame ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="media-frame__image" style={{ objectPosition: position }} />
    </div>
  );
}
