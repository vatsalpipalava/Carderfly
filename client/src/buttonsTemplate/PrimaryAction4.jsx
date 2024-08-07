/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { primaryActionField } from "@/components/modules/primaryActionField";

export function PrimaryAction4({
  primaryActions,
  // propButtonBg,
  propButtonText,
}) {
  return (
    <>
      {primaryActions.map((value) => {
        const addedField = primaryActionField.find(
          (field) => field._id === value._id
        );
        if (addedField) {
          return (
            <Button
              key={value._id}
              asChild
              size="icon"
              className="h-11 w-11 rounded-full bg-transparent hover:bg-transparent"
              style={{
                color: propButtonText,
                border: `2px solid ${propButtonText}`,
              }}
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
  return <Icon className="h-6 w-6" />;
}
