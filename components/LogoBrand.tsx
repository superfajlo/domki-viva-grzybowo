import Image from "next/image";
import Link from "next/link";

type LogoBrandProps = {
  variant?: "light" | "dark" | "footer" | "header";
  className?: string;
  linked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 682;

export function LogoBrand({
  variant = "dark",
  className = "",
  linked = true,
  size = "md",
}: LogoBrandProps) {
  const heightClass =
    variant === "footer"
      ? "h-auto w-full"
      : variant === "header"
        ? "h-full w-full max-h-[4.25rem] sm:max-h-[4.75rem] lg:max-h-[5.25rem]"
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
        ? "max-w-none"
        : size === "xl"
        ? "max-w-[min(100%,18rem)] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[28rem]"
        : "max-w-[min(100%,14rem)] sm:max-w-[16rem] md:max-w-[18rem]";

  const imageClass =
    variant === "header"
      ? `${heightClass} ${maxWidthClass} shrink-0 object-contain object-center`
      : `${heightClass} w-auto ${maxWidthClass} shrink-0 object-contain object-left`;

  const content = (
    <Image
      src="/images/logo.png"
      alt="Domki Viva Grzybowo – logo"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={imageClass}
      priority={linked}
      unoptimized
    />
  );

  const wrapClass =
    variant === "footer"
      ? `block w-full ${className}`
      : variant === "header"
        ? `header-logo-badge inline-flex h-[calc(var(--header-height)-0.5rem)] min-w-[10.5rem] max-w-[42vw] items-center justify-center rounded-2xl border border-sand-dark/70 bg-gradient-to-br from-sand via-white to-primary/20 px-2.5 py-1 shadow-[0_4px_14px_rgba(247,198,0,0.18)] transition hover:border-secondary/40 hover:shadow-[0_6px_18px_rgba(247,198,0,0.28)] sm:min-w-[12.5rem] sm:px-3 md:min-w-[14.5rem] lg:min-w-[16.5rem] lg:px-3.5 ${className}`
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
