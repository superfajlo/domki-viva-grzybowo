type ShieldCheckIconProps = {
  className?: string;
  size?: number;
};

/** Tarcza z zielonym znacznikiem weryfikacji */
export function ShieldCheckIcon({ className = "", size = 40 }: ShieldCheckIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 4L8 10v12c0 9.94 6.84 19.24 16 21 9.16-1.76 16-11.06 16-21V10L24 4z"
        fill="currentColor"
        className="text-secondary/25"
      />
      <path
        d="M24 6.5L10.5 11.5v10.5c0 8.45 5.82 16.38 13.5 18 7.68-1.62 13.5-9.55 13.5-18V11.5L24 6.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-secondary"
      />
      <circle cx="34" cy="14" r="9" fill="#22c55e" />
      <path
        d="M31 14l2 2 5-5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
