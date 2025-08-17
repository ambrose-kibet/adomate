"use client";
import { RootState } from "@/lib/redux/store";
import { useState, useEffect } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedObject } from "@/lib/redux/fabric/canvas-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import * as fabric from "fabric";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";

const LockComponent: React.FC<{ selectedObject: fabric.Object | null }> = ({
  selectedObject,
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const { canvasInstance } = useSelector((s: RootState) => s.canvas);
  const dispatch = useDispatch();

  // Sync UI when selection changes
  useEffect(() => {
    if (selectedObject) {
      setIsLocked(!!selectedObject.lockMovementX); // use lockMovementX as truthy indicator
    } else {
      setIsLocked(false);
    }
  }, [selectedObject]);

  const toggleLock = () => {
    if (!selectedObject || !canvasInstance) return;

    const shouldLock = !isLocked;

    selectedObject.set({
      evented: !shouldLock,
      hasControls: !shouldLock,
      lockMovementX: shouldLock,
      lockMovementY: shouldLock,
      lockScalingX: shouldLock,
      lockScalingY: shouldLock,
      lockRotation: shouldLock,
    });

    setIsLocked(shouldLock);

    canvasInstance.renderAll();
    canvasInstance.discardActiveObject();

    dispatch(setSelectedObject(selectedObject));
  };

  const lockIcon = isLocked ? (
    <FaLock className="h-5 w-5" />
  ) : (
    <FaLockOpen className="h-5 w-5" />
  );

  return (
    <Tooltip>
      <TooltipTrigger className="p-2" onClick={toggleLock}>
        {lockIcon}
      </TooltipTrigger>
      <TooltipContent>
        {isLocked ? "Unlock Object" : "Lock Object"}
      </TooltipContent>
    </Tooltip>
  );
};
export default LockComponent;
