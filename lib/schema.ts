import { CONTACT, FAQ_ITEMS, HOME_SEO, PRICING, SITE_URL } from "./site";

export function lodgingBusinessJsonLd() {
  const priceRange = `od ${PRICING[0].priceFrom} PLN`;

  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "TouristAccommodation", "LocalBusiness"],
    "@id": `${SITE_URL}/#lodging`,
    name: "Domki ,,Viva''",
    description: HOME_SEO.description,
    url: SITE_URL,
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    image: `${SITE_URL}/images/og-domki-viva.webp`,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      postalCode: "78-132",
      addressLocality: "Grzybowo",
      addressRegion: "zachodniopomorskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Aneks kuchenny", value: true },
      { "@type": "LocationFeatureSpecification", name: "700 m do plaży", value: true },
    ],
    areaServed: ["Grzybowo", "Kołobrzeg", "Bałtyk"],
    knowsAbout: [
      "noclegi Grzybowo",
      "domki nad morzem",
      "rodzinne wakacje nad morzem",
    ],
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Start",
        item: SITE_URL,
      },
    ],
  };
}
