import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Cropper from "react-easy-crop";
import "../../../App.css";

import { FiPlus } from "react-icons/fi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { profileImg, backCoverImg } from "@/slices/cardSlice";

export function HeaderAttachments() {
  const inputProfileRef = useRef();
  const inputCoverImgRef = useRef();

  const [profile, setProfile] = useState("");
  const [croppedAreaProfile, setCroppedAreaProfile] = useState(null);
  const aspectRatioProfile = 1 / 1;

  const [coverImg, setCoverImg] = useState("");
  const [croppedAreaCoverImg, setCroppedAreaCoverImg] = useState(null);
  const aspectRatioCoverImg = 13 / 6;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openCoverImgDialog, setOpenCoverImgDialog] = useState(false);

  const dispatch = useDispatch();

  const handleOpenProfileModel = () => {
    setOpenProfileDialog(true);
  };

  const handleOpenCoverImgModel = () => {
    setOpenCoverImgDialog(true);
  };

  const handleCloseProfileModel = () => {
    setOpenProfileDialog(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaProfile(null);
    if (inputProfileRef.current) {
      inputProfileRef.current.value = null;
    }
  };

  const handleCloseCoverImgModel = () => {
    setOpenCoverImgDialog(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaCoverImg(null);
    if (inputCoverImgRef.current) {
      inputCoverImgRef.current.value = null; // Clear the input value
    }
  };

  const onCropCompleteProfile = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedAreaProfile(croppedAreaPixels);
  };

  const onCropCompleteCoverImg = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedAreaCoverImg(croppedAreaPixels);
  };

  const onCropDoneProfile = async (imgCroppedArea) => {
    try {
      const croppedImage = await resizeCroppedImage(
        profile,
        imgCroppedArea,
        200
      );
      handleCloseProfileModel();
      setProfile(croppedImage);
      dispatch(profileImg(croppedImage));
    } catch (err) {
      console.error("Error resizing profile image:", err);
    }
  };

  const onCropDoneCoverImg = async (imgCroppedArea) => {
    try {
      const croppedImage = await resizeCroppedImage(
        coverImg,
        imgCroppedArea,
        600
      );
      handleCloseCoverImgModel();
      setCoverImg(croppedImage);
      dispatch(backCoverImg(croppedImage));
    } catch (err) {
      console.error("Error resizing cover image:", err);
    }
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result);
        handleOpenProfileModel();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImg(reader.result);
        handleOpenCoverImgModel();
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeCroppedImage = (imageSrc, croppedArea, maxWidth) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = function () {
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = croppedArea.width * scaleX;
        canvas.height = croppedArea.height * scaleY;
        ctx.drawImage(
          img,
          croppedArea.x * scaleX,
          croppedArea.y * scaleY,
          croppedArea.width * scaleX,
          croppedArea.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );
        canvas.toBlob(
          (blob) => {
            const newImg = new Image();
            const url = URL.createObjectURL(blob);
            newImg.onload = function () {
              const aspectRatio = newImg.width / newImg.height;
              const newWidth = Math.min(maxWidth, newImg.width);
              const newHeight = newWidth / aspectRatio;
              const resizedCanvas = document.createElement("canvas");
              const resizedCtx = resizedCanvas.getContext("2d");
              resizedCanvas.width = newWidth;
              resizedCanvas.height = newHeight;
              resizedCtx.drawImage(newImg, 0, 0, newWidth, newHeight);
              resolve(resizedCanvas.toDataURL("image/jpeg"));
            };
            newImg.src = url;
          },
          "image/jpeg",
          1
        );
      };
    });

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Header Attachments</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 sm:p-6">
        {/* Profile */}
        <div className="mb-2 flex w-full items-center gap-4 sm:gap-6">
          <div className="relative h-full w-auto">
            <label
              htmlFor="profile-input"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-secondary"
            >
              {profile ? (
                <img
                  src={profile}
                  alt="profile"
                  className="h-11 w-11 rounded-lg object-cover"
                />
              ) : (
                <FiPlus className="h-5 w-5 text-primary" />
              )}
            </label>
            <input
              ref={inputProfileRef}
              onChange={handleProfileChange}
              id="profile-input"
              type="file"
              accept=".jpg, .png, .jpeg, .svg"
              style={{ display: "none" }}
            />
          </div>
          <div className="h-full w-full">
            <h5 className="text-md font-bold">Add Profile</h5>
            <p className="text-sm">Suggested format: svg, png, jpg</p>
          </div>
        </div>

        <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="cropper">
              <Cropper
                image={profile}
                aspect={aspectRatioProfile}
                crop={crop}
                zoom={zoom}
                restrictPosition={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteProfile}
                minZoom={0.7}
                maxZoom={5}
                zoomSpeed={0.1}
              />
            </div>
            <DialogFooter>
              <Button
                color="danger"
                variant="light"
                onClick={handleCloseProfileModel}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => onCropDoneProfile(croppedAreaProfile)}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="mb-6 text-sm text-muted-foreground">
          Recommended profile image size is 250 x 250 pixels, with an aspect
          ratio of 1:1
        </p>

        {/* Cover Image */}

        <div className="mb-2 flex w-full items-center gap-4 sm:gap-6">
          <div className="relative h-full w-auto">
            <label
              htmlFor="cover-input"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-secondary"
            >
              {coverImg ? (
                <img
                  src={coverImg}
                  alt="coverImg"
                  className="h-11 w-11 rounded-lg object-cover"
                />
              ) : (
                <FiPlus className="h-5 w-5 text-primary" />
              )}
            </label>
            <input
              ref={inputCoverImgRef}
              onChange={handleCoverImgChange}
              id="cover-input"
              type="file"
              accept=".jpg, .png, .jpeg"
              style={{ display: "none" }}
            />
          </div>
          <div className="h-full w-full">
            <h5 className="text-md font-bold">Add Cover Photo</h5>
            <p className="text-sm">Suggested format: jpeg, png</p>
          </div>
        </div>

        <Dialog open={openCoverImgDialog} onOpenChange={setOpenCoverImgDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="cropper">
              <Cropper
                image={coverImg}
                aspect={aspectRatioCoverImg}
                crop={crop}
                zoom={zoom}
                restrictPosition={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteCoverImg}
                minZoom={0.7}
                maxZoom={5}
                zoomSpeed={0.1}
              />
            </div>
            <DialogFooter>
              <Button
                color="danger"
                variant="light"
                onClick={handleCloseCoverImgModel}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => onCropDoneCoverImg(croppedAreaCoverImg)}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="text-sm text-muted-foreground">
          Recommended cover photo size is 800 x 266.66 pixels, with an aspect
          ratio of 3:1
        </p>
      </CardContent>
    </Card>
  );
}
