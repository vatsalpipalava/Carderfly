import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import templates from "@/TemplatesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { setTemplateId } from "@/slices/editCardSlice";

// eslint-disable-next-line react/prop-types
export function ChangeTemplate({ templateId }) {
  const [selectedFramework, setSelectedFramework] = React.useState(
    `${templateId}`
  );
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedFramework(value);
    dispatch(setTemplateId(value));
  };
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Change Template</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <Select value={selectedFramework} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Templates</SelectLabel>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
