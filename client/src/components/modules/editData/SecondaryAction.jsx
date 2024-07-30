import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { secondaryActionField } from "../secondaryActionField";
import {
  addSecondaryAction,
  deleteSecondaryAction,
  updateSecondaryAction,
} from "@/slices/editCardSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SecondaryAction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActions, setFilteredActions] = useState([]);

  const dispatch = useDispatch();
  const secondaryAction = useSelector(
    (state) => state?.editCard?.card?.secondaryActions
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Perform filtering logic here
    const filtered = secondaryActionField.filter((action) =>
      action.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredActions(filtered);
  };

  // Initially show all actions
  React.useEffect(() => {
    setFilteredActions(secondaryActionField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findById = (array, _id) => array.find((item) => item._id === _id);

  const addAction = (_id) => {
    const existingField = findById(secondaryAction, _id);

    if (existingField) {
      // If the _id is already added, remove it
      dispatch(deleteSecondaryAction({ _id }));
    } else {
      // If the _id is not added, add it
      dispatch(addSecondaryAction({ _id, value: "" }));
    }
  };

  const removeAction = (_id) => {
    dispatch(deleteSecondaryAction({ _id }));
  };

  const updateAction = (_id, value) => {
    dispatch(updateSecondaryAction({ _id, value }));
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Secondary Actions</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <div className="relative">
          <IoIosSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
          <Input
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search action"
            className="pl-10"
          />
        </div>
      </CardContent>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          {secondaryAction &&
            secondaryAction.map((value) => {
              const addedField = secondaryActionField.find(
                (field) => field._id === value._id
              );
              return addedField ? (
                <div key={value._id} className="flex items-center space-x-2">
                  <div className="relative w-full">
                    <IconInputContainer icon={addedField.icon} />
                    <Input
                      type={addedField.type}
                      value={value?.value || ""}
                      onChange={(e) => updateAction(value._id, e.target.value)}
                      placeholder={addedField.placeholder}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={() => removeAction(addedField._id)}
                    size="icon"
                    variant="ghost"
                  >
                    <IoCloseOutline className="h-5 w-5" />
                  </Button>
                </div>
              ) : null;
            })}
          {secondaryAction.length === 0 && (
            <div className="flex h-12 items-center justify-center">
              <p className="">No actions are selected</p>
            </div>
          )}
        </div>
      </CardContent>
      <Separator />
      <CardContent className="p-0 sm:p-0">
        {/* <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {filteredActions &&
            filteredActions.map((action) => {
              const existingField = findById(secondaryAction, action._id);
              return (
                <Button
                  key={action._id}
                  variant={existingField ? "" : "outline"}
                  onClick={() => addAction(action._id)}
                  style={{
                    backgroundColor: existingField
                      ? action.color
                      : "transparent",
                    borderColor: action.color,
                  }}
                  className={`w-full justify-start ${
                    existingField ? "" : "border-2"
                  }`}
                >
                  <IconContainer
                    icon={action.icon}
                    color={existingField ? "" : action.color}
                  />
                  <span
                    style={{
                      color: existingField ? "" : action.color,
                    }}
                  >
                    {action.label}
                  </span>
                </Button>
              );
            })}
        </div> */}
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="px-6 hover:bg-muted hover:no-underline">
              Actions
            </AccordionTrigger>
            <AccordionContent>
              <Separator />
              <div className="grid grid-cols-2 gap-4 p-4 sm:gap-6 sm:p-6">
                {filteredActions &&
                  filteredActions.map((action) => {
                    const existingField = findById(secondaryAction, action._id);
                    return (
                      <Button
                        key={action._id}
                        variant={existingField ? "" : "outline"}
                        onClick={() => addAction(action._id)}
                        style={{
                          backgroundColor: existingField
                            ? action.color
                            : "transparent",
                          borderColor: action.color,
                        }}
                        className={`w-full justify-start ${
                          existingField ? "" : "border-2"
                        }`}
                      >
                        <IconContainer
                          icon={action.icon}
                          color={existingField ? "" : action.color}
                        />
                        <span
                          style={{
                            color: existingField ? "" : action.color,
                          }}
                        >
                          {action.label}
                        </span>
                      </Button>
                    );
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line react/prop-types
function IconContainer({ icon: Icon, color }) {
  return <Icon className="mr-2 h-5 w-5" style={{ color: color }} />;
}

// eslint-disable-next-line react/prop-types
function IconInputContainer({ icon: Icon }) {
  return (
    <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
  );
}
