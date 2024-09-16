import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { DollarSign, IndianRupee, SquareCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CardBody } from "@/components/ui/3d-card";
import GridPattern from "@/components/magicui/grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import { getUserLocation } from "@/api/userLocation";

export function Pricing() {
  const { theme } = useTheme();
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  useEffect(() => {
    const setCurrencyBasedOnLocation = async () => {
      const country = await getUserLocation();
      if (country === "IN") {
        setDefaultCurrency("INR");
      } else {
        setDefaultCurrency("USD");
      }
    };

    setCurrencyBasedOnLocation();
  }, []);

  return (
    <main className="relative z-10 w-full py-12 md:py-16 lg:py-20">
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

        <Tabs
          value={defaultCurrency}
          onValueChange={setDefaultCurrency}
          className="relative z-30 w-full"
        >
          <TabsList className="mx-auto mb-10 grid h-auto w-full max-w-sm grid-cols-2">
            <TabsTrigger value="INR" className="group gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary group-data-[state=active]:border-transparent group-data-[state=active]:bg-primary">
                <IndianRupee className="h-4 w-4 text-primary group-data-[state=active]:text-white" />
              </div>
              <p className="text-lg">INR</p>
            </TabsTrigger>
            <TabsTrigger value="USD" className="group gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary group-data-[state=active]:border-transparent group-data-[state=active]:bg-primary">
                <DollarSign className="h-4 w-4 text-primary group-data-[state=active]:text-white" />
              </div>
              <p className="text-lg">USD</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="INR">
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
                      <p>3 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p className="break-words">
                        Cancel subscription at period&apos;s end
                      </p>
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
                    ₹599 <span className="text-lg">/ 6 Months</span>
                  </h3>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>6 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Cancel subscription at period&apos;s end</p>
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
                      <p>12 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Cancel subscription at period&apos;s end</p>
                    </div>
                  </div>
                </CardBody>
              </MagicCard>
            </div>
          </TabsContent>
          <TabsContent value="USD">
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
                    $7 <span className="text-lg">/ 3 Months</span>
                  </h3>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>3 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p className="break-words">
                        Cancel subscription at period&apos;s end
                      </p>
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
                    $10 <span className="text-lg">/ 6 Months</span>
                  </h3>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>6 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Cancel subscription at period&apos;s end</p>
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
                    $15 <span className="text-lg">/ 12 Months</span>
                  </h3>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>12 Months access per card.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Share any where, any time.</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Simple and easy-to-use interface</p>
                    </div>
                    <div className="flex w-full items-center gap-4">
                      <SquareCheck className="h-5 w-5 text-primary" />
                      <p>Cancel subscription at period&apos;s end</p>
                    </div>
                  </div>
                </CardBody>
              </MagicCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "z-20 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </main>
  );
}
