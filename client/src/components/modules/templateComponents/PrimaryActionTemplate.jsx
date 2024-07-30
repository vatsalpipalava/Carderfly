/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { primaryActionField } from "../primaryActionField";

export function PrimaryActionTemplate({
  primaryActions,
  propButtonBg,
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
              className="h-11 w-11"
              style={{ backgroundColor: propButtonBg, color: propButtonText }}
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
