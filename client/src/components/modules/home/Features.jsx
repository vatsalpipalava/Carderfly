import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import DotPattern from "@/components/magicui/dot-pattern";
import { FadeText } from "@/components/magicui/fade-text";

import SocialShare from "@/assets/svgs/social-share.png";
import FeatureContent from "@/assets/svgs/feature-content.png";
import CompanyDetails from "@/assets/svgs/company-details.png";
import Action from "@/assets/svgs/action.png";
import QrCode from "@/assets/svgs/qr-code.png";
import VCF from "@/assets/svgs/vcf.png";

export function Features() {
  return (
    <main className="relative -z-20 h-full w-full bg-muted">
      <div className="z-10 mx-auto h-full w-full max-w-[1280px] px-4 py-20 sm:px-6">
        <div className="mb-4 flex w-full items-center justify-center">
          <FadeText
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={
              <Badge
                variant="outline"
                className="border-foreground text-sm font-bold"
              >
                Packed with features
              </Badge>
            }
          />
        </div>
        <FadeText
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
          text={
            <h1 className="mb-24 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Build your dream site.
              <br />
              No compromises.
            </h1>
          }
        />
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-16 sm:grid-cols-2">
          {/* 1  Social Share */}

          <FadeText
            direction="left"
            framerProps={{
              show: { transition: { delay: 0.6 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img
                    src={SocialShare}
                    alt="SocialShare"
                    className="h-9 w-9"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Social Share
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />

          {/* 2 Easy Action */}
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.6 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img src={Action} alt="Action" className="h-9 w-9" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Easy Action
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />

          {/* 3 Feature Content */}
          <FadeText
            direction="left"
            framerProps={{
              show: { transition: { delay: 0.8 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img
                    src={FeatureContent}
                    alt="FeatureContent"
                    className="h-9 w-9"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Feature Content
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />

          {/* 4 Scan and Download QR Code */}
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.8 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img src={QrCode} alt="QrCode" className="h-9 w-9" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Scan and Download QR Code
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />

          {/* 5 Feature */}
          <FadeText
            direction="left"
            framerProps={{
              show: { transition: { delay: 1 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img
                    src={CompanyDetails}
                    alt="SocialShare"
                    className="h-9 w-9"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Company Details
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />

          {/* 6 Feature */}
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 1 } },
            }}
            text={
              <div className="flex gap-6">
                <div className="flex max-h-14 min-h-14 min-w-14 max-w-14 items-center justify-center rounded-lg bg-background">
                  <img src={VCF} alt="VCF" className="h-8 w-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Downloadable VCF file
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate with your team on Slack. Planner Easily schedule
                    and plan your workflow.
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <DotPattern
        width={10}
        height={10}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "-z-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
    </main>
  );
}
