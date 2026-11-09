import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/chaitanya-horizontal.png";
import { siteConfig } from "@/config/site";

/** The official lockup has light lettering, so it must sit on a dark surface. */
export function Logo({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`.trim()} aria-label={`${siteConfig.name}, home`}>
      <Image
        src={logo}
        alt=""
        priority={priority}
        sizes="(max-width: 640px) 132px, 168px"
        className="logo__image"
      />
    </Link>
  );
}
