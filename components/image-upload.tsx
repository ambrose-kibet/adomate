"use client";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Card } from "./ui/card";
import { FabricImage } from "fabric";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";
import { RootState } from "@/lib/redux/store";

interface ImageUploadProps {
  maxFiles?: number;
}

const ImageUpload = ({ maxFiles = 1 }: ImageUploadProps) => {
  const dispatch = useDispatch();
  const canvasInstance = useSelector((s: RootState) => s.canvas.canvasInstance);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // if the number of files is greater than the maxFiles

    if (acceptedFiles.length > maxFiles) {
      toast.error(`You can only upload ${maxFiles} files`);
      return;
    }
    //check if each of the file is an image
    const isNotImage = acceptedFiles.some(
      (file) => !file.type.startsWith("image")
    );
    if (isNotImage) {
      toast.error("You can only upload images");
      return;
    }

    const isNotPNG = acceptedFiles.some((file) => file.type !== "image/png");
    if (isNotPNG) {
      toast.error("You can only upload PNG images");
      return;
    }

    //check if the size of the file is greater than 2mb
    const isTooLarge = acceptedFiles.some(
      (file) => file.size > 2 * 1024 * 1024
    );
    if (isTooLarge) {
      toast.error("You can only upload images smaller than 2mb");
      return;
    }

    // set Image as canvas background
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!canvasInstance) {
        toast.error("Canvas is not initialized");
        return;
      }
      const imgElement = new Image();
      imgElement.src = e.target?.result as string;
      imgElement.onload = async () => {
        const img = await new FabricImage(imgElement);
        canvasInstance?.setDimensions({
          width: img.width,
          height: img.height,
        });

        canvasInstance!.backgroundImage = img;

        dispatch(
          updateCanvas({
            canvasJSON: JSON.stringify(canvasInstance.toJSON()),
            canvasWidth: canvasInstance.width,
            canvasHeight: canvasInstance.height,
          })
        );
        canvasInstance.renderAll();
        toast.success("Image uploaded successfully");
      };
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Card
      onClick={() => open?.()}
      className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              p-20 
              flex
              flex-col
              justify-center
              items-center
              gap-4       
            "
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        accept="image/png"
        disabled={!canvasInstance}
      />
      {isDragActive ? (
        <h2 className="font-semibold text-lg">Drop the files here ...</h2>
      ) : (
        <h2 className="font-semibold text-sm">
          click to add or drag and drop image here
        </h2>
      )}

      <TbPhotoPlus size={50} />
    </Card>
  );
};
export default ImageUpload;
