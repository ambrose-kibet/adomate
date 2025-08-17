"use client";
import { RootState } from "@/lib/redux/store";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";
import type { ITextProps } from "fabric";
import { Button } from "../ui/button";
import TextColor from "./text-color";
import FontSize from "./font-size";
import LineHeight from "./line-height";
import FontPicker from "./font-picker";
import TextAlignment from "./text-alignment";
import LetterSpacing from "./letter-spacing";

const isTextObject = (obj: fabric.Object | null) => {
  if (!obj) return false;
  return obj.type === "i-text" || obj.type === "textbox" || obj.type === "text";
};
const TextTools: React.FC = () => {
  const {
    canvas: { selectedObject, canvasInstance },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const updateText = ({
    property,
    value,
  }: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => {
    if (!canvasInstance || !selectedObject) return;

    const activeObject = canvasInstance.getActiveObject();
    if (!activeObject || !isTextObject(activeObject)) return;

    activeObject.set(property, value);
    canvasInstance.renderAll();
  };
  if (!isTextObject(selectedObject)) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-2">
        <FontPicker
          updateText={updateText}
          currentFont={String(selectedObject?.get("fontFamily"))}
        />
        <FontSize
          updateText={updateText}
          currentFontSize={Number(selectedObject?.get("fontSize"))}
        />
        <Button
          variant={
            selectedObject?.get("fontWeight") === "bold" ? "default" : "outline"
          }
          onClick={() => {
            updateText({
              property: "fontWeight",
              value:
                selectedObject?.get("fontWeight") === "bold"
                  ? "normal"
                  : "bold",
            });
            canvasInstance?.discardActiveObject();
          }}
        >
          <FaBold />
        </Button>
        <Button
          variant={
            selectedObject?.get("fontStyle") === "italic"
              ? "default"
              : "outline"
          }
          onClick={() => {
            updateText({
              property: "fontStyle",
              value:
                selectedObject?.get("fontStyle") === "italic"
                  ? "normal"
                  : "italic",
            });
            canvasInstance?.discardActiveObject();
          }}
        >
          <FaItalic />
        </Button>
        <Button
          variant={selectedObject?.get("underline") ? "default" : "outline"}
          onClick={() => {
            updateText({
              property: "underline",
              value: !selectedObject?.get("underline"),
            });
            canvasInstance?.discardActiveObject();
          }}
        >
          <FaUnderline />
        </Button>
        <Button
          variant={selectedObject?.get("linethrough") ? "default" : "outline"}
          onClick={() => {
            updateText({
              property: "linethrough",
              value: !selectedObject?.get("linethrough"),
            });
            canvasInstance?.discardActiveObject();
          }}
        >
          <FaStrikethrough />
        </Button>

        <TextColor updateText={updateText} />
        <TextAlignment
          updateText={updateText}
          currentAlignment={String(selectedObject?.get("textAlign"))}
        />
        <LineHeight updateText={updateText} />
        <LetterSpacing updateText={updateText} />
      </div>
    </div>
  );
};
export default TextTools;
