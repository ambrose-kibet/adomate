"use client";

import { useDispatch, useSelector } from "react-redux";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";
import { IText, Textbox } from "fabric";
import { Button } from "./ui/button";
import { RootState } from "@/lib/redux/store";

const TEXT_OPTIONS = {
  left: 100, // X position
  top: 100, // Y position
  fontFamily: "serif", // Font family
  fill: "#333333", // Text color
  selectable: true,
  fontStyle: "normal",
  linethrough: false,
  underline: false,
  textAlign: "left",
  hasControls: true,
};
type TextStyle = "heading" | "subheading" | "small";
const TextSettings: React.FC = () => {
  const canvasInstance = useSelector((s: RootState) => s.canvas.canvasInstance);
  const dispatch = useDispatch();

  // Helper to get font options by style
  const getFontOptions = (style: TextStyle) => {
    switch (style) {
      case "heading":
        return { fontSize: 36, fontWeight: 500 };
      case "subheading":
        return { fontSize: 24, fontWeight: 200 };
      case "small":
        return { fontSize: 14, fontWeight: 100 };
      default:
        return { fontSize: 14, fontWeight: 100 };
    }
  };

  // Add text to canvas
  const addText = (text: string, style: TextStyle) => {
    if (!canvasInstance) return;
    const fontOptions = getFontOptions(style);
    const textObject = new IText(text, {
      ...TEXT_OPTIONS,
      ...fontOptions,
    });
    canvasInstance.add(textObject);
    canvasInstance.setActiveObject(textObject);
    dispatch(
      updateCanvas({
        canvasJSON: JSON.stringify(canvasInstance.toJSON()),
        canvasWidth: canvasInstance.getWidth(),
        canvasHeight: canvasInstance.getHeight(),
      })
    );
    canvasInstance.renderAll();
  };

  const addTextbox = (text: string, style: TextStyle) => {
    if (!canvasInstance) return;
    const fontOptions = getFontOptions(style);
    const textboxObject = new Textbox(text, {
      ...TEXT_OPTIONS,
      ...fontOptions,
      width: 300,
      height: 200, // Set a default height for the textbox
    });
    canvasInstance.add(textboxObject);
    canvasInstance.setActiveObject(textboxObject);
    dispatch(
      updateCanvas({
        canvasJSON: JSON.stringify(canvasInstance.toJSON()),
        canvasWidth: canvasInstance.getWidth(),
        canvasHeight: canvasInstance.getHeight(),
      })
    );
    canvasInstance.renderAll();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="btn w-full text-2xl"
        variant={"secondary"}
        onClick={() => addTextbox("Sample Text", "subheading")}
      >
        Add Textbox
      </Button>

      <Button
        className="btn w-full text-3xl"
        variant={"secondary"}
        onClick={() => addText("Heading Text", "heading")}
      >
        Add Heading
      </Button>
      <Button
        className="btn w-full text-xl"
        variant={"secondary"}
        onClick={() => addText("Subheading Text", "subheading")}
      >
        Add Subheading
      </Button>
      <Button
        className="btn w-full text-sm"
        variant={"secondary"}
        onClick={() => addText("Small Text", "small")}
      >
        Add Small Text
      </Button>
    </div>
  );
};
export default TextSettings;
