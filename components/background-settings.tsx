"use client";
import { useState } from "react";
import ColorPicker from "./color-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";
import { RootState } from "@/lib/redux/store";

const BackgroundSettings: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const canvasInstance = useSelector((s: RootState) => s.canvas.canvasInstance);
  const dispatch = useDispatch();
  if (!canvasInstance) return;
  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
    canvasInstance.set({
      backgroundColor: color,
    });
    const json = JSON.stringify(canvasInstance.toJSON());
    dispatch(
      updateCanvas({
        canvasJSON: json,
        canvasWidth: canvasInstance.getWidth(),
        canvasHeight: canvasInstance.getHeight(),
      })
    );

    canvasInstance.renderAll();
  };

  return (
    <div>
      <ColorPicker value={backgroundColor} onColorChange={handleColorChange} />
    </div>
  );
};
export default BackgroundSettings;
