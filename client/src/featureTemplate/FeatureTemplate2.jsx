/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

export function FeatureTemplate2({
  sections,
  propText,
  propFeatureText,
  // propFeatureSeparator,
}) {
  return (
    <>
      {sections.map((section) => (
        <Card
          key={section._id}
          className="border-none bg-transparent pb-8 shadow-none"
        >
          <CardHeader className="p-0 pb-4">
            <CardTitle style={{ color: propText }}>
              {section.sectionName}
            </CardTitle>
          </CardHeader>
          {/* <Separator style={{ backgroundColor: propFeatureSeparator }} /> */}
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4">
              {section.subSections.map((subSection) => (
                <Card
                  key={subSection._id}
                  className="rounded-lg border-none bg-transparent shadow-lg"
                  style={{ color: propFeatureText }}
                >
                  <CardContent className="relative p-0">
                    <img
                      src={subSection.image}
                      alt={subSection.heading}
                      className="aspect-square h-full w-full rounded-lg object-cover shadow-md"
                    />
                    <CardContent className="absolute bottom-0 left-0 w-full rounded-b-lg bg-gradient-to-t from-[#00000066] from-80% to-100% px-3 pb-2 pt-3">
                      <p className="mt-0 text-sm font-medium">
                        {subSection.heading}
                      </p>
                    </CardContent>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
