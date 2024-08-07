/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { secondaryActionField } from "@/components/modules/secondaryActionField";
import { Link } from "react-router-dom";

export function SecondaryAction3({ secondaryActions }) {
  return (
    <>
      {secondaryActions.map((value) => {
        const addedField = secondaryActionField.find(
          (field) => field._id === value._id
        );
        if (addedField) {
          return (
            <Button
              key={value._id}
              size="icon"
              className="shadow-inner-custom relative flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full"
              style={{
                backgroundColor: addedField.color,
              }}
            >
              <Link
                to={`${addedField.linkPrefix}${value.value}${addedField.linkSuffix}`}
                target="_blank"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute z-10 min-h-12 min-w-12 rounded-full blur-[2px]"
                    style={{ backgroundColor: `${addedField.color}80` }}
                  ></div>
                  <div
                    className="absolute z-20 min-h-12 min-w-12 rounded-full blur-[64px]"
                    style={{ backgroundColor: `${addedField.color}1a` }}
                  ></div>
                </div>
                <span className="relative z-10">
                  <IconContainer icon={addedField.icon} />
                </span>
              </Link>
            </Button>
          );
        }
        return null;
      })}
    </>
  );
}

function IconContainer({ icon: Icon }) {
  return <Icon className="h-6 w-6" />;
}
