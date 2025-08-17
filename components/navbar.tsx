"use client";
import Logo from "@/components/logo";
import ModeToggle from "@/components/theme-toggler";
import { CloudDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
const Navbar: React.FC = () => {
  const { canvasInstance } = useSelector((state: RootState) => state.canvas);
  const downloadCanvas = () => {
    if (!canvasInstance) return;

    const dataURL = canvasInstance.toDataURL({
      format: "png",
      multiplier: 1,
    });

    const link = document.createElement("a");
    const fileName = `canvas-${new Date().toISOString()}.png`;
    link.href = dataURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="flex items-center justify-between px-2  ">
      <Logo />
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={downloadCanvas}
          disabled={!canvasInstance}
        >
          <span>
            <CloudDownload className="h-5 w-5" />
          </span>
          Download
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
