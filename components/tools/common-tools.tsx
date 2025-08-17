"use client";
import { RootState } from "@/lib/redux/store";
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  setSelectedObject,
  setSelectedObjects,
} from "@/lib/redux/fabric/canvas-slice";
import { useDispatch } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import LockComponent from "./lock-component";

const CommonTools: React.FC = () => {
  const { selectedObject, selectedObjects, canvasInstance } = useSelector(
    (state: RootState) => state.canvas
  );
  const dispatch = useDispatch();

  const handleCopy = async () => {
    if (!canvasInstance) return;

    if (!selectedObject) {
      toast.error("No object selected to duplicate");
      return;
    }
    console.log("Cloning selected object", selectedObject);

    const cloned = await selectedObject.clone();
    cloned.set({
      left: selectedObject.left! + 10,
      top: selectedObject.top! + 10,
    });
    canvasInstance.add(cloned);

    canvasInstance.renderAll();
    dispatch(
      setSelectedObject(null) // Clear single selection
    );
  };
  const handleDelete = () => {
    if (selectedObject && canvasInstance) {
      canvasInstance.remove(selectedObject);
      canvasInstance.discardActiveObject();
      dispatch(setSelectedObject(null));
      canvasInstance.renderAll();
    }
    if (selectedObjects && selectedObjects.length && canvasInstance) {
      selectedObjects.forEach((obj) => {
        canvasInstance.remove(obj);
      });
      dispatch(setSelectedObject(null));
      dispatch(setSelectedObjects([]));
      canvasInstance.discardActiveObject(); // Deselect the group
      canvasInstance.renderAll();
    }
  };
  const handleBringToFront = () => {
    if (!selectedObject || !canvasInstance) return;
    canvasInstance.bringObjectToFront(selectedObject);
    canvasInstance.discardActiveObject();
    dispatch(setSelectedObject(null));
    canvasInstance.renderAll();
  };
  const handleSendToBack = () => {
    if (!selectedObject || !canvasInstance) return;
    canvasInstance.sendObjectToBack(selectedObject);
    canvasInstance.discardActiveObject();
    dispatch(setSelectedObject(null));
    canvasInstance.renderAll();
  };

  const toggleLock = () => {
    if (!selectedObject || !canvasInstance) return;
    selectedObject.set({ evented: !selectedObject.evented });
    if (selectedObject.evented) {
      toast.success("Object unlocked");
    } else {
      toast.success("Object locked");
    }
    canvasInstance.renderAll();
    dispatch(setSelectedObject(selectedObject));
  };

  if (!canvasInstance || !selectedObject) return null;

  return (
    <div className="justify-center items-center flex space-x-2 common-tools z-10">
      <Tooltip>
        <TooltipTrigger className="p-2" onClick={() => handleCopy()}>
          <Copy className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>Duplicate</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className="p-2" onClick={() => handleBringToFront()}>
          <ArrowUp className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>Bring to Front</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className="p-2" onClick={() => handleSendToBack()}>
          <ArrowDown className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>Send to Back</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className="p-2" onClick={() => handleDelete()}>
          <Trash className="h-5 w-5 text-red-700" />
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
export default CommonTools;
