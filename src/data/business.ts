// Verified facts only. See docs/RESEARCH.md for sources and dates.
export const business = {
  name: "DOT Concept Bar",
  street: "Age Mamužića 2",
  postal: "24000",
  city: "Subotica",
  country: "Srbija",
  phoneDisplay: "+381 24 523 076",
  phoneHref: "tel:+38124523076",
  email: "dotconceptstore@yahoo.com",
  instagram: "https://www.instagram.com/dotconceptbar/",
  // Google Maps place profile observation, checked 2026-11-26.
  geo: { lat: 46.0988554, lng: 19.6651161 },
  directions: "https://www.google.com/maps/dir/?api=1&destination=46.0988554,19.6651161",
  mapsSearch:
    "https://www.google.com/maps/search/?api=1&query=DOT+Concept+Bar+Age+Mamu%C5%BEi%C4%87a+2+Subotica",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=19.6611%2C46.0968%2C19.6691%2C46.1008&layer=mapnik&marker=46.0988554%2C19.6651161",
  rating: { value: 4.8, count: 206, source: "Google Maps", checked: "2026-11-26" },
  amenities: ["wifi"] as const,
} as const;
