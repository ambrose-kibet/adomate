"use client";
import React, { useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setCanvas } from "@/lib/redux/fabric/canvas-slice";
import { updateCanvas } from "@/lib/redux/fabric/fabric-slice";
import { debounce } from "lodash";
import {
  setSelectedObject,
  setSelectedObjects,
} from "@/lib/redux/fabric/canvas-slice";

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    fabric: { present },
    canvas: { canvasInstance },
  } = useSelector((s: RootState) => s);
  const suppressRef = useRef(false);
  const canvasInstanceRef = useRef<Canvas | null>(null);
  const dispatch = useDispatch();

  // Initialize Fabric.js canvas once

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      height: 600,
      backgroundColor: "#fff",
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    canvasInstanceRef.current = fabricCanvas;
    dispatch(setCanvas(fabricCanvas));
    const handleSaveCanvas = debounce(() => {
      if (!fabricCanvas) return;
      const json = JSON.stringify(fabricCanvas.toJSON());
      dispatch(
        updateCanvas({
          canvasJSON: json,
          canvasWidth: fabricCanvas.getWidth(),
          canvasHeight: fabricCanvas.getHeight(),
        })
      );
    }, 500);

    const updateSelectedObjects = () => {
      if (!fabricCanvas) return;
      const activeObject = fabricCanvas.getActiveObject();
      const activeGroup = fabricCanvas.getActiveObjects();
      if (activeObject) {
        dispatch(setSelectedObject(activeObject));
      } else if (activeGroup && activeGroup.length > 0) {
        dispatch(setSelectedObjects(activeGroup));
      } else {
        dispatch(setSelectedObject(null));
        dispatch(setSelectedObjects([]));
      }
    };

    const combineCallbacks = () => {
      handleSaveCanvas();
      updateSelectedObjects();
    };

    // key listeners for  for nudging objects

    //handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fabricCanvas) return;
      const activeObject = fabricCanvas.getActiveObject();
      if (!activeObject) return;
      const step = 3; // pixels to nudge
      switch (e.key) {
        case "ArrowUp":
          activeObject.set("top", activeObject.top - step);
          break;
        case "ArrowDown":
          activeObject.set("top", activeObject.top + step);
          break;
        case "ArrowLeft":
          activeObject.set("left", activeObject.left - step);
          break;
        case "ArrowRight":
          activeObject.set("left", activeObject.left + step);
          break;
        default:
          return; // exit this handler for other keys
      }
      fabricCanvas.renderAll();
      e.preventDefault(); // prevent default arrow key scrolling
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);

    //listen for changes and save canvas state
    fabricCanvas.on("selection:created", combineCallbacks);
    fabricCanvas.on("selection:updated", combineCallbacks);
    fabricCanvas.on("selection:cleared", combineCallbacks);

    // ✅ Always clean up on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      fabricCanvas.off("selection:created", combineCallbacks);
      fabricCanvas.off("selection:updated", combineCallbacks);
      fabricCanvas.off("selection:cleared", combineCallbacks);
      fabricCanvas.dispose();
      canvasInstanceRef.current = null;
    };
  }, []); // runs only once on mount

  // Listen for Redux state changes (undo/redo/import)
  useEffect(() => {
    if (!canvasInstance) return; // ✅ Guard: no canvas yet
    if (!present.canvasJSON || present.canvasJSON === "{}") return;
    const reloadCanvas = async () => {
      suppressRef.current = true;
      await canvasInstance.loadFromJSON(present.canvasJSON);
      canvasInstance.setDimensions({
        width: present.canvasWidth,
        height: present.canvasHeight,
      });
      canvasInstance.renderAll();
      suppressRef.current = false;
    };

    if (suppressRef.current) return; // Prevent reloading during initial load
    reloadCanvas();
  }, [canvasInstance, present.canvasJSON]);

  return (
    <div className="pt-12 w-full h-full  overflow-auto flex items-center justify-center">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default FabricCanvas;
