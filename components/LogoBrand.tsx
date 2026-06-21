import Image from "next/image";
import Link from "next/link";

type LogoBrandProps = {
  variant?: "light" | "dark" | "footer";
  className?: string;
  linked?: boolean;
  size?: "sm" | "md" | "lg";
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
    size === "lg"
      ? "h-12 sm:h-14 md:h-16"
      : size === "sm"
        ? "h-9 sm:h-10"
        : "h-11 sm:h-12";

  const content = (
    <Image
      src="/images/logo.png"
      alt="Domki Viva Grzybowo – logo"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`${heightClass} w-auto max-w-[min(100%,14rem)] shrink-0 object-contain object-left sm:max-w-[16rem] md:max-w-[18rem] ${
        variant === "footer" ? "brightness-110" : ""
      }`}
      priority={linked}
      unoptimized
    />
  );

  const wrapClass = `inline-flex min-w-0 max-w-full items-center ${className}`;

  if (!linked) {
    return <div className={wrapClass}>{content}</div>;
  }

  return (
    <Link href="/" className={`${wrapClass} shrink-0`} aria-label="Domki Viva Grzybowo – strona główna">
      {content}
    </Link>
  );
}
