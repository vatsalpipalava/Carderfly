/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureTemplate4({ sections, propText, propFeatureText }) {
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
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4">
              {section.subSections.map((subSection) => (
                <Card
                  key={subSection._id}
                  className="rounded-2xl bg-transparent shadow-none"
                  style={{
                    color: propFeatureText,
                    border: `solid 2px ${propFeatureText}60`,
                  }}
                >
                  <CardContent className="p-0 shadow-none">
                    <img
                      src={subSection.image}
                      alt={subSection.heading}
                      className="aspect-square h-full w-full rounded-t-[14px] object-cover shadow-none"
                    />
                  </CardContent>
                  <CardContent className="rounded-b-2xl bg-white px-2 py-2 shadow-none">
                    <p className="text-center text-base font-medium">
                      {subSection.heading}
                    </p>
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
