/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { secondaryActionField } from "@/components/modules/secondaryActionField";
import { Link } from "react-router-dom";

export function SecondaryAction2({ secondaryActions }) {
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
              className="relative flex min-h-12 min-w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: addedField.color,
              }}
            >
              <Link
                to={`${addedField.linkPrefix}${value.value}${addedField.linkSuffix}`}
                target="_blank"
              >
                
                <div className="absolute inset-0">
                  <div className="bg-[#00000014] absolute left-0 top-0 h-1/2 w-full rounded-t-xl"></div>
                </div>
                <span className="relative z-10">
                  <IconContainer
                  icon={addedField.icon}
                />
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
