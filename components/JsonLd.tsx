import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  lodgingBusinessJsonLd,
} from "@/lib/schema";

export function JsonLd() {
  const scripts = [
    lodgingBusinessJsonLd(),
    faqPageJsonLd(),
    breadcrumbJsonLd(),
  ];

  return (
    <>
      {scripts.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
