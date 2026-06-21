import Image from "next/image";
import Link from "next/link";
import { HEADER_LOGO } from "@/lib/site";

type LogoBrandProps = {
  variant?: "light" | "dark" | "footer" | "header";
  className?: string;
  linked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 682;
const HEADER_LOGO_WIDTH = 1024;
const HEADER_LOGO_HEIGHT = 511;

export function LogoBrand({
  variant = "dark",
  className = "",
  linked = true,
  size = "md",
}: LogoBrandProps) {
  const isHeader = variant === "header";
  const logoSrc = isHeader ? HEADER_LOGO : "/images/logo.png";
  const logoWidth = isHeader ? HEADER_LOGO_WIDTH : LOGO_WIDTH;
  const logoHeight = isHeader ? HEADER_LOGO_HEIGHT : LOGO_HEIGHT;

  const heightClass =
    variant === "footer"
      ? "h-auto w-full"
      : variant === "header"
        ? "h-[calc(var(--header-height)-0.35rem)] w-auto max-h-[4.5rem] sm:max-h-[5rem] lg:max-h-[5.75rem]"
        : size === "xl"
        ? "h-14 sm:h-16 md:h-[4.5rem]"
        : size === "lg"
          ? "h-12 sm:h-14 md:h-16"
          : size === "sm"
            ? "h-9 sm:h-10"
            : "h-11 sm:h-12";

  const maxWidthClass =
    variant === "footer"
      ? "max-w-full"
      : variant === "header"
        ? "max-w-[min(78vw,24rem)] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[36rem]"
        : size === "xl"
        ? "max-w-[min(100%,18rem)] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[28rem]"
        : "max-w-[min(100%,14rem)] sm:max-w-[16rem] md:max-w-[18rem]";

  const imageClass =
    variant === "header"
      ? `${heightClass} ${maxWidthClass} shrink-0 object-contain object-center`
      : `${heightClass} w-auto ${maxWidthClass} shrink-0 object-contain object-left`;

  const content = (
    <Image
      src={logoSrc}
      alt="Domki Viva Grzybowo – logo"
      width={logoWidth}
      height={logoHeight}
      className={imageClass}
      priority={linked}
      unoptimized
    />
  );

  const wrapClass =
    variant === "footer"
      ? `block w-full ${className}`
      : variant === "header"
        ? `inline-flex shrink-0 items-center transition-opacity hover:opacity-90 ${className}`
        : `inline-flex min-w-0 max-w-full items-center ${className}`;

  if (!linked) {
    return <div className={wrapClass}>{content}</div>;
  }

  return (
    <Link href="/" className={`${wrapClass} shrink-0`} aria-label="Domki Viva Grzybowo – strona główna">
      {content}
    </Link>
  );
}
