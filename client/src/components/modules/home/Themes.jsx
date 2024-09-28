import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProfessionalSuiteImg from "@/assets/templates/professional-suite.jpg";
import CorporateEleganceImg from "@/assets/templates/corporate-elegance.jpg";
import ExecutiveClassImg from "@/assets/templates/executive-class.jpg";
import BusinessPrimeImg from "@/assets/templates/business-prime.jpg";
import ProfessionalEdgeImg from "@/assets/templates/professional-edge.jpg";
import PrestigeConnectImg from "@/assets/templates/prestige-connect.jpg";
import EliteNetworkerImg from "@/assets/templates/elite-networker.jpg";
import CorporateIdentityImg from "@/assets/templates/corporate-identity.jpg";
import PrimeEssentialsImg from "@/assets/templates/prime-essentials.jpg";
import ExecutiveDesignImg from "@/assets/templates/executive-design.jpg";

export function Themes() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-md bg-background pt-20 antialiased">
      <InfiniteMovingCards items={templates} direction="left" speed="normal" />
    </div>
  );
}

const templates = [
  {
    image: ProfessionalSuiteImg,
    name: "Professional Suite",
    url: "professional_suite",
  },
  {
    image: CorporateEleganceImg,
    name: "Corporate Elegance",
    url: "corporate_elegance",
  },
  {
    image: ExecutiveClassImg,
    name: "Executive Class",
    url: "executive_class",
  },
  {
    image: EliteNetworkerImg,
    name: "Elite Networker",
    url: "elite_networker",
  },
  {
    image: PrimeEssentialsImg,
    name: "Prime Essentials",
    url: "prime_essentials",
  },
  {
    image: BusinessPrimeImg,
    name: "Business Prime",
    url: "business_prime",
  },
  {
    image: ProfessionalEdgeImg,
    name: "Professional Edge",
    url: "professional_edge",
  },
  {
    image: PrestigeConnectImg,
    name: "Prestige Connect",
    url: "prestige_connect",
  },
  {
    image: CorporateIdentityImg,
    name: "Corporate Identity",
    url: "corporate_identity",
  },
  {
    image: ExecutiveDesignImg,
    name: "Executive Design",
    url: "executive_design",
  },
];
