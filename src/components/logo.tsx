import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand-logo${compact ? " brand-logo--compact" : ""}`}
      aria-label="chaitanya Trading Consultancy home"
    >
      <Image
        src="/brand/chaitanya-horizontal.png"
        alt="chaitanya Trading Consultancy"
        width={793}
        height={270}
        priority={!compact}
        sizes={
          compact
            ? "(max-width: 640px) 158px, 185px"
            : "(max-width: 640px) 175px, 208px"
        }
      />
    </Link>
  );
}
