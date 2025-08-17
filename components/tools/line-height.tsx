"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CiLineHeight } from "react-icons/ci";
import { Button } from "../ui/button";
import { ITextProps } from "fabric";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const LineHeight: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
}> = ({ updateText }) => {
  const { canvasInstance, selectedObject } = useSelector(
    (state: RootState) => state.canvas
  );
  if (!canvasInstance) return null;

  const setLineHeight = (lineHeight: number) => {
    updateText({ property: "lineHeight", value: lineHeight });
    canvasInstance?.discardActiveObject();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <CiLineHeight className=" h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <h2 className="text-sm font-semibold mb-2">Line Height</h2>
        <div className="flex flex-col space-y-2">
          {[1, 1.2, 1.5, 1.75, 2].map((lineHeight) => (
            <Button
              key={lineHeight}
              variant={
                selectedObject?.get("lineHeight") === lineHeight
                  ? "default"
                  : "outline"
              }
              className="w-full justify-between"
              onClick={() => setLineHeight(lineHeight)}
            >
              {lineHeight}
              {selectedObject?.get("lineHeight") === lineHeight && (
                <FaCheck className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default LineHeight;
