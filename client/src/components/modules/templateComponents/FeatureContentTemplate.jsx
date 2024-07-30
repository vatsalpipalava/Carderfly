/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function FeatureContentTemplate({
  sections,
  propText,
  propFeatureText,
  propFeatureSeparator
}) {
  return (
    <>
      {sections.map((section) => (
        <Card
          key={section._id}
          className="border-none bg-transparent pb-6 shadow-none"
        >
          <CardHeader className="p-0 pb-4">
            <CardTitle style={{ color: propText }}>
              {section.sectionName}
            </CardTitle>
          </CardHeader>
          <Separator style={{backgroundColor: propFeatureSeparator}} />
          <CardContent className="p-0 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {section.subSections.map((subSection) => (
                <Card
                  key={subSection._id}
                  className="bg-transparent border-none shadow-lg"
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
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
