/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { secondaryActionField } from "../secondaryActionField";
import { Link } from "react-router-dom";

export function SecondaryActionTemplate({ secondaryActions }) {
  return (
    <>
      {secondaryActions.map((value) => {
        const addedField = secondaryActionField.find(
          (field) => field._id === value._id
        );
        if (addedField) {
          return (
            <Button
              asChild
              key={value._id}
              size="icon"
              className="h-11 w-11"
              style={{ backgroundColor: addedField.color }}
            >
              <Link
                to={`${addedField.linkPrefix}${value.value}${addedField.linkSuffix}`}
                target="_blank"
              >
                <IconContainer icon={addedField.icon} />
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
  return <Icon className="h-5 w-5" />;
}
