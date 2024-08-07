/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureTemplate3({ sections, propText, propFeatureText }) {
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
                  className="border-none bg-transparent shadow-[1px_1px_10px_0px_rgba(0,0,0,0.1)] rounded-[14px]"
                  style={{ color: propFeatureText }}
                >
                  <CardContent className="p-0">
                    <img
                      src={subSection.image}
                      alt={subSection.heading}
                      className="aspect-square h-full w-full rounded-t-[14px] object-cover shadow-md"
                    />
                  </CardContent>
                  <CardContent className="rounded-b-[14px] bg-white px-2 py-2">
                    <p className="text-center text-sm font-normal">
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
