import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";
import { business } from "@/data/business";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Menu } from "@/components/site/Menu";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Social } from "@/components/site/Social";
import { Visit } from "@/components/site/Visit";
import { Footer } from "@/components/site/Footer";

const title = "DOT Concept Bar — kafić i bar u Subotici / Szabadka";
const description = "DOT Concept Bar, Age Mamužića 2, Subotica. Kafa, točeno pivo, kokteli i vino u centru grada. Szabadka kávézó és bár.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "sr_RS" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BarOrPub", name: business.name,
        address: { "@type": "PostalAddress", streetAddress: business.street, postalCode: business.postal, addressLocality: business.city, addressCountry: "RS" },
        geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
        telephone: "+38124523076", email: business.email, sameAs: [business.instagram], priceRange: "RSD",
        aggregateRating: { "@type": "AggregateRating", ratingValue: business.rating.value, reviewCount: business.rating.count },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip</a>
      <Navbar />
      <main>
        <Hero /><About /><Menu /><Gallery /><Reviews /><Social /><Visit />
      </main>
      <Footer />
    </LangProvider>
  );
}
