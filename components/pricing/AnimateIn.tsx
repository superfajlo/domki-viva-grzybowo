"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function AnimateIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let active = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => {
        if (active) setVisible(true);
      });
      return () => {
        active = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active || !entry.isIntersecting) return;
        observer.disconnect();
        requestAnimationFrame(() => {
          if (active) setVisible(true);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const frame = requestAnimationFrame(() => {
      if (active && ref.current) observer.observe(ref.current);
    });

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`pricing-reveal ${visible ? "pricing-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
