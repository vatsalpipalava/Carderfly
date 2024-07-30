/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

export function CarouselTemplate({
  sections,
  propButtonBg,
  propButtonText,
  propText,
  propFeatureText,
  propFeatureSeparator,
}) {
  return (
    <>
      {sections.map((section) => (
        <div
          key={section._id}
          className="border-none bg-transparent pb-6 shadow-none"
        >
          <header className="p-0 pb-2">
            <div className="text-lg font-medium" style={{ color: propText }}>{section.sectionName}</div>
          </header>
          <Separator style={{ backgroundColor: propFeatureSeparator }} />
          <Carousel
            className="w-full max-w-60 mx-auto mt-4"
          >
            <CarouselContent>
              {section.subSections.map((subSection) => (
                <CarouselItem key={subSection._id}>
                  <div className="p-1">
                  <Card
                    className="border-none bg-transparent"
                    style={{ color: propFeatureText }}
                  >
                    <CardContent className="p-0">
                      <img
                        src={subSection.image}
                        alt={subSection.heading}
                        className="aspect-square h-full w-full rounded-lg object-cover shadow-md"
                      />
                    </CardContent>
                    <CardContent className="px-2 py-1">
                      <p>{subSection.heading}</p>
                    </CardContent>
                  </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant="primary" style={{backgroundColor: propButtonBg, color: propButtonText}} />
            <CarouselNext variant="primary" style={{backgroundColor: propButtonBg, color: propButtonText}} />
            
          </Carousel>
        </div>
      ))}
    </>
  );
}
