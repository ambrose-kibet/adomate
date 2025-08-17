"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaAlignJustify } from "react-icons/fa";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "../ui/button";
import { RootState } from "@/lib/redux/store";
import { ITextProps } from "fabric";
import { useSelector } from "react-redux";

const TextAlignment: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
  currentAlignment: string;
}> = ({ updateText, currentAlignment }) => {
  const { canvasInstance, selectedObject } = useSelector(
    (state: RootState) => state.canvas
  );
  if (!canvasInstance) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <FaAlignJustify className=" h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex gap-2">
        <Button
          variant={currentAlignment === "left" ? "default" : "outline"}
          onClick={() => {
            updateText({ property: "textAlign", value: "left" });
            canvasInstance?.discardActiveObject();
          }}
        >
          <AlignLeft />
        </Button>
        <Button
          variant={currentAlignment === "center" ? "default" : "outline"}
          onClick={() => {
            updateText({ property: "textAlign", value: "center" });
            canvasInstance?.discardActiveObject();
          }}
        >
          <AlignCenter />
        </Button>
        <Button
          variant={currentAlignment === "right" ? "default" : "outline"}
          onClick={() => {
            updateText({ property: "textAlign", value: "right" });
            canvasInstance?.discardActiveObject();
          }}
        >
          <AlignRight />
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TextAlignment;
