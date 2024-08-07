import { useRef, useState } from "react";
import { Cropper, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/bubble.css";
import { useDispatch, useSelector } from "react-redux";
import "../../../App.css";

import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  businessAddress,
  businessDescription,
  businessName,
  firstName,
  jobTitle,
  lastName,
  logoImg,
} from "@/slices/editCardSlice";

export function ContactInfo() {
  const inputLogoRef = useRef();
  const cropperRef = useRef(null);

  const [logo, setLogo] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openLogoDialog, setOpenLogoDialog] = useState(false);

  const dispatch = useDispatch();
  const cardData = useSelector((state) => state?.editCard?.card);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    businessName: "",
    businessAddress: "",
    businessDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "firstName") dispatch(firstName(value));
    if (name === "lastName") dispatch(lastName(value));
    if (name === "jobTitle") dispatch(jobTitle(value));
    if (name === "businessName") dispatch(businessName(value));
    if (name === "businessAddress") dispatch(businessAddress(value));
    if (name === "businessDescription") dispatch(businessDescription(value));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
        setOpenLogoDialog(true);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  const onCropComplete = (cropper) => {
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        const maxWidth = 350;
        const scaleFactor = maxWidth / canvas.width;
        const scaledCanvas = document.createElement("canvas");
        scaledCanvas.width = maxWidth;
        scaledCanvas.height = canvas.height * scaleFactor;

        const ctx = scaledCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

        const resizedImageData = scaledCanvas.toDataURL();
        setCroppedImage(resizedImageData);
      }
    }
  };

  const onSaveCroppedLogo = () => {
    if (croppedImage) {
      dispatch(logoImg(croppedImage));
      setOpenLogoDialog(false);
      setLogo(null);
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        <div className="mb-2 flex w-full items-center gap-4 sm:gap-6">
          <div className="relative h-full w-auto">
            <label
              htmlFor="logo-input"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-secondary"
            >
              {cardData?.logoImg ? (
                <img
                  src={cardData?.logoImg}
                  alt="logo"
                  className="h-11 w-11 rounded-lg object-cover"
                />
              ) : (
                <FiPlus className="h-6 w-6 text-primary" />
              )}
            </label>
            <input
              ref={inputLogoRef}
              onChange={handleLogoChange}
              id="logo-input"
              type="file"
              accept=".jpg, .png, .jpeg, .svg"
              style={{ display: "none" }}
            />
          </div>
          <div className="h-full w-full">
            <h5 className="text-base font-bold">Add Logo</h5>
            <p className="text-sm">Suggested format: svg, png, jpg</p>
          </div>
        </div>

        <Dialog open={openLogoDialog} onOpenChange={setOpenLogoDialog}>
          <DialogContent className="mx-auto h-auto max-h-[90vh] w-full max-w-[200vh]">
            <DialogHeader>
              <DialogTitle>Edit Logo</DialogTitle>
            </DialogHeader>
            <div className="cropper-feature">
              <Cropper
                src={logo}
                ref={cropperRef}
                imageRestriction={ImageRestriction.fitArea}
                onChange={() => onCropComplete(cropperRef.current)}
                className="h-full max-h-[70vh]"
              />
            </div>
            <DialogFooter className="items-end">
              <Button color="primary" onClick={onSaveCroppedLogo}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="text-sm text-muted-foreground">
          Recommended profile image size is 250 x 250 pixels, with an aspect
          ratio of 1:1
        </p>
      </CardContent>
      <Separator />
      <CardContent className="grid grid-flow-row gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Input
            type="text"
            name="firstName"
            value={formData.firstName || cardData?.firstName || ""}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <Input
            type="text"
            name="lastName"
            value={formData.lastName || cardData?.lastName || ""}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <Input
            type="text"
            name="jobTitle"
            value={formData.jobTitle || cardData?.jobTitle || ""}
            onChange={handleInputChange}
            placeholder="Job Title"
          />
          <Input
            type="text"
            name="businessName"
            value={formData.businessName || cardData?.businessName || ""}
            onChange={handleInputChange}
            placeholder="Business Name"
          />
        </div>
        <Textarea
          name="businessAddress"
          value={formData.businessAddress || cardData?.businessAddress || ""}
          onChange={handleInputChange}
          placeholder="Business Address"
        />
        <Textarea
          name="businessDescription"
          value={formData.businessDescription || cardData?.businessDescription || ""}
          onChange={handleInputChange}
          placeholder="Business Description"
        />
      </CardContent>
    </Card>
  );
}
