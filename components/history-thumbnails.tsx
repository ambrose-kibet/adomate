"use client";

import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { StaticCanvas } from "fabric";
import { useEffect, useState } from "react";

const HistoryThumbnails: React.FC = () => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const { past, present, future } = useSelector((s: RootState) => s.fabric); // fetch past and future states from Redux store

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails = await Promise.all(
        [...past, ...future].map(async (state, i) => {
          const tempCanvas = new StaticCanvas(`temp-canvas-${i}`, {
            width: state.canvasWidth,
            height: state.canvasHeight,
          });
          await tempCanvas.loadFromJSON(state.canvasJSON, () => {
            tempCanvas.renderAll();
          });
          return tempCanvas.toDataURL({ format: "png", multiplier: 0.5 });
        })
      );

      setThumbnails(newThumbnails.reverse());
    };

    if (past.length || future.length) {
      generateThumbnails();
    } else {
      setThumbnails([]);
    }
  }, [past, future]);
  return (
    <div className="flex gap-2 flex-col p-2 max-h-[calc(100vh-73px)] overflow-y-auto">
      <h2 className="text-lg font-semibold text-muted-foreground">History </h2>
      {thumbnails.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Thumbnail ${index}`}
          className="w-24 h-24 object-cover"
        />
      ))}
    </div>
  );
};
export default HistoryThumbnails;
