import Image from "next/image";
import Link from "next/link";

type LogoBrandProps = {
  variant?: "light" | "dark" | "footer";
  className?: string;
  linked?: boolean;
  size?: "sm" | "md" | "lg";
};

export function LogoBrand({
  variant = "dark",
  className = "",
  linked = true,
  size = "md",
}: LogoBrandProps) {
  const domkiClass =
    variant === "light"
      ? "text-white drop-shadow-md"
      : variant === "footer"
        ? "text-white"
        : "text-ink";

  const imgClass =
    size === "lg"
      ? "h-12 w-12 sm:h-14 sm:w-14"
      : size === "sm"
        ? "h-10 w-10"
        : "h-11 w-11 sm:h-12 sm:w-12";

  const textClass =
    size === "lg"
      ? "text-base leading-tight sm:text-xl md:text-2xl"
      : size === "sm"
        ? "text-lg sm:text-xl"
        : "text-lg sm:text-xl";

  const content = (
    <>
      <Image
        src="/images/logo.png"
        alt="Logo Domki VIVA"
        width={56}
        height={56}
        className={`${imgClass} shrink-0 object-contain`}
        priority={linked}
        unoptimized
      />
      <span className={`font-display font-bold tracking-tight ${textClass} ${domkiClass}`}>
        Domki <span className="uppercase text-viva-yellow drop-shadow-sm">VIVA</span>
      </span>
    </>
  );

  const wrapClass = `inline-flex min-w-0 items-center gap-2 sm:gap-3 ${className}`;

  if (!linked) {
    return <div className={wrapClass}>{content}</div>;
  }

  return (
    <Link href="/" className={`${wrapClass} shrink-0`} aria-label="Domki VIVA – strona główna">
      {content}
    </Link>
  );
}
