/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { primaryActionField } from "@/components/modules/primaryActionField";

export function PrimaryAction2({
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
              size="icon"
              className="relative flex min-h-12 min-w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${propButtonBg}`,
                color: propButtonText,
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
