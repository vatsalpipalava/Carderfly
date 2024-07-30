import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { HiMinusSmall, HiPlusSmall } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  addFeatureSection,
  addFeatureSubSection,
  deleteFeatureSection,
  deleteFeatureSubSection,
  updateSectionName,
  updateSubSection,
} from "@/slices/cardSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cropper, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";
import "../../../App.css";

export function FeatureContent() {
  const cropperRef = useRef(null);

  const [sectionNameInputs, setSectionNameInputs] = useState({}); // State to track input for sectionName
  const [subSectionInputs, setSubSectionInputs] = useState({}); // State to track inputs for subSections
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSubSectionId, setSelectedSubSectionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const sections = useSelector((state) => state.card?.sections);

  const addSection = () => {
    dispatch(addFeatureSection());
  };

  const addSubSection = (sectionId) => {
    dispatch(addFeatureSubSection({ sectionId }));
  };

  const handleSectionNameChange = (e, sectionId) => {
    const updatedInputs = { ...sectionNameInputs };
    updatedInputs[sectionId] = e.target.value;
    setSectionNameInputs(updatedInputs);
    dispatch(updateSectionName({ sectionId, sectionName: e.target.value }));
  };

  const handleSubSectionChange = (e, sectionId, subSectionId) => {
    const updatedSubSectionInputs = { ...subSectionInputs };
    updatedSubSectionInputs[subSectionId] = e.target.value;
    setSubSectionInputs(updatedSubSectionInputs);
    // Preserve the existing image data
    const existingImageData = sections
      .find((section) => section._id === sectionId)
      ?.subSections.find(
        (subSection) => subSection._id === subSectionId
      )?.image;
    dispatch(
      updateSubSection({
        sectionId,
        subSectionId,
        image: existingImageData,
        heading: e.target.value,
      })
    );
  };

  const deleteSection = (sectionId) => {
    dispatch(deleteFeatureSection({ sectionId }));
  };

  const deleteSubSection = (sectionId, subSectionId) => {
    dispatch(deleteFeatureSubSection({ sectionId, subSectionId }));
  };

  // Function to handle image selection and open modal
  const handleImageSelection = (sectionId, subSectionId, e) => {
    setSelectedSectionId(sectionId);
    setSelectedSubSectionId(subSectionId);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset the value of the input field
    e.target.value = null;
  };

  const onSaveCroppedImage = (croppedImage) => {
    // Create a new canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to 200x200
    canvas.width = 300;
    canvas.height = 300;

    // Create a new image element
    const img = new Image();
    img.onload = function () {
      // Draw the cropped image onto the new canvas with resizing
      ctx.drawImage(img, 0, 0, 300, 300);
      // Get the resized image data as a base64 encoded string
      const resizedImageData = canvas.toDataURL();
      // Dispatch action to update the sub section image with the resized image
      dispatch(
        updateSubSection({
          sectionId: selectedSectionId,
          subSectionId: selectedSubSectionId,
          image: resizedImageData,
          heading: subSectionInputs[selectedSubSectionId] || "",
        })
      );
      // Close the modal and reset state
      setIsModalOpen(false);
      setSelectedImage(null);
      setSelectedSectionId(null);
      setSelectedSubSectionId(null);
    };

    // Set the source of the image to the cropped image data
    img.src = croppedImage;
  };
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Feature Content</CardTitle>
      </CardHeader>
      <Separator />

      {sections.map((section) => (
        <div key={section._id}>
          <Separator />
          <CardContent className="p-4 sm:p-6">
            <div
              className="flex items-center space-x-2"
            >
              <Input
                type="text"
                value={sectionNameInputs[section._id] || section.sectionName}
                onChange={(e) => handleSectionNameChange(e, section._id)}
                placeholder="Section Title"
              />
              <Button
                onClick={() => deleteSection(section._id)}
                size="icon"
                variant="ghost"
              >
                <IoCloseOutline className="h-5 w-5" />
              </Button>
            </div>
            <Separator className="my-4 sm:my-6" />

            {section.subSections.map((subSection) => (
              <div key={subSection._id} className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="h-full w-auto">
                      <label
                        htmlFor={`image-input-${section._id}-${subSection._id}`}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-secondary"
                      >
                        {subSection.image ? (
                          <img
                            src={subSection.image}
                            alt="Logo Preview"
                            className="aspect-[1/1] h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <FiPlus className="h-6 w-6 text-primary" />
                        )}
                      </label>
                      <input
                        id={`image-input-${section._id}-${subSection._id}`}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={(e) =>
                          handleImageSelection(section._id, subSection._id, e)
                        }
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <h5 className="text-md font-bold">Add Media</h5>
                      <p className="text-sm">Suggested format: jpg, png</p>
                    </div>
                  </div>

                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="mx-auto h-auto max-h-[90vh] w-full max-w-[200vh]">
                      <DialogHeader>
                        <DialogTitle>Edit Image</DialogTitle>
                        <DialogDescription>
                          Make changes to your image here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      {/* <div className="cropper-feature"> */}
                        <Cropper
                          // image={profile}
                          // aspect={aspectRatioProfile}
                          // crop={crop}
                          // zoom={zoom}
                          // restrictPosition={false}
                          // onCropChange={setCrop}
                          // onZoomChange={setZoom}
                          // onCropComplete={onCropCompleteProfile}
                          // minZoom={0.7}
                          // maxZoom={5}
                          // zoomSpeed={0.1}
                          ref={cropperRef}
                          src={selectedImage}
                          aspectRatio={1 / 1}
                          imageRestriction={ImageRestriction.fitArea}
                          className="h-full max-h-[70vh]"
                        />
                      {/* </div> */}
                      <DialogFooter className="items-end">
                        {/* <Button
                          color="danger"
                          variant="light"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </Button> */}
                        <Button
                          color="primary"
                          onClick={() =>
                            onSaveCroppedImage(
                              cropperRef.current.getCanvas().toDataURL()
                            )
                          }
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="w-auto">
                    <Button
                      onClick={() =>
                        deleteSubSection(section._id, subSection._id)
                      }
                      size="icon"
                      variant="ghost"
                    >
                      <HiMinusSmall className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="my-4 w-full sm:my-6">
                  <Input
                    type="text"
                    value={
                      subSectionInputs[subSection._id] || subSection.heading
                    }
                    onChange={(e) =>
                      handleSubSectionChange(e, section._id, subSection._id)
                    }
                    placeholder="Media Name/Detail"
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => addSubSection(section._id)}
              >
                <HiPlusSmall className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </div>
      ))}

      <Separator />
      <CardFooter className="p-4 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Button
            className="h-11 w-11 bg-secondary"
            size="icon"
            variant="ghost"
            onClick={addSection}
          >
            <FiPlus className="h-6 w-6 text-primary" />
          </Button>
          <h5 className="text-md font-bold">Add Section</h5>
        </div>
      </CardFooter>
    </Card>
  );
}
