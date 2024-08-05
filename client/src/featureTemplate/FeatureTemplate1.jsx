/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

export function FeatureTemplate1({
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
          <CardContent className="p-0 pt-1">
            <div className="grid grid-cols-3 gap-[10px]">
              {section.subSections.map((subSection) => (
                <Card
                  key={subSection._id}
                  className="border-none bg-transparent shadow-lg"
                  style={{ color: propFeatureText }}
                >
                  <CardContent className="relative p-0">
                    <img
                      src={subSection.image}
                      alt={subSection.heading}
                      className="aspect-square h-[134px] w-full rounded-lg object-cover shadow-md"
                    />
                    <CardContent className="px-2 absolute bottom-0 left-0 py-2 bg-[#ffffff10] backdrop-blur-md rounded-lg w-full">
                      <p className="font-bold text-[16px]">{subSection.heading}</p>
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
