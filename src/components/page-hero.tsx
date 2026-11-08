import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="page-hero">
      {image ? <Image src={image} alt={imageAlt || ""} fill sizes="100vw" className="page-hero__image" /> : null}
      <div className="page-hero__shade" />
      <div className="container page-hero__content">
        <span className="eyebrow eyebrow--light"><span className="eyebrow__line" />{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
