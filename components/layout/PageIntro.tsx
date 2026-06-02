import { Breadcrumbs } from "@/components/Breadcrumbs";

type PageIntroProps = {
  h1: string;
  lead: string;
  breadcrumbs: { label: string; href?: string }[];
};

export function PageIntro({ h1, lead, breadcrumbs }: PageIntroProps) {
  return (
    <div className="page-container mx-auto max-w-7xl pt-[calc(var(--header-height)+1.5rem)] pb-6 sm:pb-8">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl xl:text-5xl">
        {h1}
      </h1>
      <p className="section-lead mt-4 max-w-3xl">{lead}</p>
    </div>
  );
}
