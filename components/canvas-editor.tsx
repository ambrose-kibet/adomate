"use client";

import FabricCanvas from "@/components/fabric-canvas";
import Toolbar from "./toolbar";

const CanvasEditor: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-accent">
      <Toolbar />
      <FabricCanvas />
    </div>
  );
};
export default CanvasEditor;
