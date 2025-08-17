"use client";

import Image from "next/image";
import { shapeList } from "./design-data/menu";
import { Rect, Circle, Triangle } from "fabric";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const ElementsSettings: React.FC = () => {
  const canvasInstance = useSelector((s: RootState) => s.canvas.canvasInstance);
  const handleShapeClick = (shapeName: string) => {
    // Create a new shape based on the shapeName
    let shape;
    switch (shapeName) {
      case "rectangle":
        shape = new Rect({
          left: 100,
          top: 100,
          fill: "blue",
          stroke: "black",
          strokeWidth: 2,
          width: 200,
          height: 100,
          angle: 0,
          hasControls: true,
          selectable: true,
        });
        break;
      case "circle":
        shape = new Circle({
          radius: 105,
          left: 100,
          top: 100,
          fill: "red",
          stroke: "black",
          strokeWidth: 2,
          hasControls: true,
          selectable: true,
        });
        break;
      case "triangle":
        shape = new Triangle({
          left: 100,
          top: 100,
          fill: "green",
          stroke: "black",
          strokeWidth: 2,
          width: 100,
          height: 100,
          angle: 0,
          hasControls: true,
          selectable: true,
        });
        break;
      default:
        return;
    }
    if (canvasInstance) {
      canvasInstance.add(shape);
      canvasInstance.setActiveObject(shape);
      canvasInstance.renderAll();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {shapeList.map((shape, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer hover:opacity-70 transition "
          onClick={() => handleShapeClick(shape.name)}
        >
          <Image
            key={index}
            src={shape.src}
            alt={shape.name}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
};
export default ElementsSettings;
