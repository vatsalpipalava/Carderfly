/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { secondaryActionField } from "@/components/modules/secondaryActionField";
import { Link } from "react-router-dom";

export function SecondaryAction1({ secondaryActions }) {
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
              className="h-12 w-12 rounded-full"
              style={{ backgroundColor: `${addedField.color}20`, color: addedField.color, border: `1px solid ${addedField.color}` }}
            >
              <Link
                to={`${addedField.linkPrefix}${value.value}${addedField.linkSuffix}`}
                target="_blank"
              >
                <IconContainer icon={addedField.icon} style={{ color: addedField }} />
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
