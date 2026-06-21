import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { ReactNode } from "react";

type PageIntroProps = {
  h1: string;
  lead: string;
  breadcrumbs: { label: string; href?: string }[];
  aside?: ReactNode;
};

export function PageIntro({ h1, lead, breadcrumbs, aside }: PageIntroProps) {
  return (
    <div className="page-container mx-auto max-w-7xl pt-[calc(var(--header-height)+1.5rem)] pb-6 sm:pb-8">
      <Breadcrumbs items={breadcrumbs} />
      <div
        className={
          aside
            ? "mt-2 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14"
            : "mt-2"
        }
      >
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl xl:text-5xl">
            {h1}
          </h1>
          <p className="section-lead mt-4 max-w-3xl">{lead}</p>
        </div>
        {aside ? <div className="w-full shrink-0 lg:max-w-md xl:max-w-lg">{aside}</div> : null}
      </div>
    </div>
  );
}
