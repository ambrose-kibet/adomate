"use client";

import FabricCanvas from "@/components/fabric-canvas";
import Toolbar from "@/components/tools/toolbar";
import { useLoadFonts } from "@/utils/font-loader";

const CanvasEditor: React.FC = () => {
  useLoadFonts();
  return (
    <div className="flex flex-col items-center py-2 gap-2 justify-center h-full w-full bg-accent relative">
      <Toolbar />
      <FabricCanvas />
    </div>
  );
};
export default CanvasEditor;
