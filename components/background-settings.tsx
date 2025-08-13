"use client";
import { useState } from "react";
import ColorPicker from "./color-picker";
import CanvasService from "@/utils/canvas-service";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";
import { useDispatch } from "react-redux";

const BackgroundSettings: React.FC = () => {
  const dispatch = useDispatch();
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const canvas = CanvasService.getInstance();

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
    canvas.set({
      backgroundColor: color,
    });
    const json = JSON.stringify(canvas.toJSON());
    dispatch(updateCanvas({ canvasJSON: json }));
    canvas.renderAll();
  };

  return (
    <div>
      <h2 className="text-sm  font-semibold mb-4">Set Background Color</h2>
      <ColorPicker value={backgroundColor} onColorChange={handleColorChange} />
    </div>
  );
};
export default BackgroundSettings;
