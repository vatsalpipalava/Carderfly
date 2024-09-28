/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { DollarSign, IndianRupee, SquareCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getUserLocation } from "@/api/userLocation";
import { useId } from "react";

export function Pricing() {
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
    <main className="relative z-10 h-auto w-full pt-12 md:pt-16 lg:pt-20">
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
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-2">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Starter Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹399 <span className="text-lg">/ 3 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>3 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>

              {/* Standard */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Standard Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹599 <span className="text-lg">/ 6 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>6 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Premium Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  ₹999 <span className="text-lg">/ 12 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>12 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="USD">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-2">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Starter Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  $7 <span className="text-lg">/ 3 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>3 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>

              {/* Standard */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Standard Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  $10 <span className="text-lg">/ 6 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>6 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950">
                <Grid size={20} />
                <p className="relative z-20 mb-3 text-base font-bold text-neutral-800 dark:text-white">
                  Premium Plan
                </p>
                <h3 className="mb-6 scroll-m-20 text-4xl font-semibold tracking-tight">
                  $15 <span className="text-lg">/ 12 Months</span>
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>12 Months access per card.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Share any where, any time.</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p>Simple and easy-to-use interface</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <SquareCheck className="h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 text-primary" />
                    <p className="break-words">
                      Cancel subscription at period&apos;s end
                    </p>
                  </div>
                </div>
              </div>
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

const Grid = ({ pattern, size }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  );
};

function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
