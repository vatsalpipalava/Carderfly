import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Themes() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-md bg-background pt-20 antialiased">
      <InfiniteMovingCards items={templates} direction="left" speed="normal" />
    </div>
  );
}

const templates = [
  {
    image: "/templates/professional_suite.jpg",
    name: "Professional Suite",
    url: "professional_suite",
  },
  {
    image: "/templates/corporate_elegance.jpg",
    name: "Corporate Elegance",
    url: "corporate_elegance",
  },
  {
    image: "/templates/executive_class.jpg",
    name: "Executive Class",
    url: "executive_class",
  },
  {
    image: "/templates/elite_networker.jpg",
    name: "Elite Networker",
    url: "elite_networker",
  },
  {
    image: "/templates/prime_essentials.jpg",
    name: "Prime Essentials",
    url: "prime_essentials",
  },
  {
    image: "/templates/business_prime.jpg",
    name: "Business Prime",
    url: "business_prime",
  },
  {
    image: "/templates/professional_edge.jpg",
    name: "Professional Edge",
    url: "professional_edge",
  },
  {
    image: "/templates/prestige_connect.jpg",
    name: "Prestige Connect",
    url: "prestige_connect",
  },
  {
    image: "/templates/corporate_identity.jpg",
    name: "Corporate Identity",
    url: "corporate_identity",
  },
  {
    image: "/templates/executive_design.jpg",
    name: "Executive Design",
    url: "executive_design",
  },
];
