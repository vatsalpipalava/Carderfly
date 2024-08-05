import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { SquareCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";

import { CardBody } from "@/components/ui/3d-card";
import GridPattern from "@/components/magicui/grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";

export function Pricing() {
  const { theme } = useTheme();
  return (
    <main className="relative -z-10 w-full py-12 md:py-16 lg:py-20">
      <div className="container z-10 mx-auto h-full w-full max-w-[1280px] px-4 py-0 sm:px-6">
        <div className="z-10 mb-4 flex w-full items-center justify-center">
          <Badge
            variant="outline"
            className="border-foreground text-sm font-bold"
          >
            Pricing
          </Badge>
        </div>
        <h1 className="mb-10 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          Explore our pricing
        </h1>
        <p className="mx-auto mb-24 max-w-[768px] text-center text-muted-foreground md:text-xl">
          Explore our range of pricing plans tailored to suit your needs. Select
          the perfect plan and start unlocking the full potential of your
          business card today.
        </p>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <MagicCard
            className="z-20 cursor-pointer flex-col items-start justify-center shadow-2xl"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <CardHeader className="p-4 text-xl font-semibold sm:p-6">
              Starter Plan
            </CardHeader>
            <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
              <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                ₹399 <span className="text-lg">/ 3 Months</span>
              </h3>
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
              </div>
            </CardBody>
          </MagicCard>

          <MagicCard
            className="z-10 cursor-pointer flex-col items-start justify-center shadow-2xl"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <CardHeader className="p-4 text-xl font-semibold sm:p-6">
              Standard Plan
            </CardHeader>
            <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
              <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                ₹599<span className="text-lg">/ 6 Months</span>
              </h3>
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
              </div>
            </CardBody>
          </MagicCard>

          <MagicCard
            className="z-10 cursor-pointer flex-col items-start justify-center shadow-2xl"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <CardHeader className="p-4 text-xl font-semibold sm:p-6">
              Premium Plan
            </CardHeader>
            <CardBody className="h-auto px-4 pb-4 sm:px-6 sm:pb-6">
              <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                ₹999 <span className="text-lg">/ 12 Months</span>
              </h3>
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <SquareCheck className="h-5 w-5 text-primary" />
                  <p>Cancel at period end.</p>
                </div>
              </div>
            </CardBody>
          </MagicCard>
        </div>
      </div>

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "-z-10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </main>
  );
}
