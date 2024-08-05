import { useTheme } from "next-themes";

import { Brush, ShieldCheck, SquareArrowRight, SquarePen } from "lucide-react";

import { CardContent, CardHeader } from "@/components/ui/card";

import { FadeText } from "@/components/magicui/fade-text";
import { MagicCard } from "@/components/magicui/magic-card";

export function Values() {
  const { theme } = useTheme();
  return (
    <main className="mb-20 mt-5 h-full w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <FadeText
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.6 } },
          }}
          text={
            <MagicCard
              className="group cursor-pointer hover:shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader>
                <SquarePen className="h-7 w-7 font-bold group-hover:text-primary" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                  Creative Design
                </h3>
                <p className="font-medium text-muted-foreground">
                  Stand out with customizable designs. Classic or modern, our
                  templates ensure lasting impressions.
                </p>
              </CardContent>
            </MagicCard>
          }
        />

        <FadeText
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.7 } },
          }}
          text={
            <MagicCard
              className="group cursor-pointer hover:shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader>
                <SquareArrowRight className="h-7 w-7 font-bold group-hover:text-primary" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                  Call to Action
                </h3>
                <p className="font-medium text-muted-foreground">
                  Consider adding a call-to-action button on each card that
                  directs users to learn more.
                </p>
              </CardContent>
            </MagicCard>
          }
        />

        <FadeText
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.8 } },
          }}
          text={
            <MagicCard
              className="group cursor-pointer hover:shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader>
                <Brush className="h-7 w-7 font-bold group-hover:text-primary" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                  Customizable Colors
                </h3>
                <p className="font-medium text-muted-foreground">
                  Customize your card with our color options to match your brand
                  identity for a professional look.
                </p>
              </CardContent>
            </MagicCard>
          }
        />

        <FadeText
          direction="down"
          framerProps={{
            show: { transition: { delay: 0.9 } },
          }}
          text={
            <MagicCard
              className="group cursor-pointer hover:shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader>
                <ShieldCheck className="h-7 w-7 font-bold group-hover:text-primary" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                  Reliable Service
                </h3>
                <p className="font-medium text-muted-foreground">
                  Ensure your business card is always accessible with our
                  reliable, high-performance platform. Share confidently.
                </p>
              </CardContent>
            </MagicCard>
          }
        />
      </div>
    </main>
  );
}
