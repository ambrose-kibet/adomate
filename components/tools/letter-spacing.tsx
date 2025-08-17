"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { ITextProps } from "fabric";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { RiLetterSpacing2 } from "react-icons/ri";
import { useState } from "react";
import { debounce } from "lodash";
import { Slider } from "../ui/slider";

const LetterSpacing: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
}> = ({ updateText }) => {
  const { canvasInstance, selectedObject } = useSelector(
    (state: RootState) => state.canvas
  );
  const [opacity, setOpacity] = useState<number>(0);
  if (!canvasInstance) return null;

  const setLetterSpacing = (letterSpacing: number) => {
    setOpacity(letterSpacing);
    debounce(() => {
      updateText({ property: "charSpacing", value: letterSpacing });
    }, 300)();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <RiLetterSpacing2 className=" h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <h2 className="text-sm font-semibold mb-2">Letter Spacing</h2>
        <Slider
          value={[opacity]}
          onValueChange={(value) => setLetterSpacing(value[0])}
          className="mt-2"
          defaultValue={[0]}
          step={5}
          min={0}
          max={1000}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
export default LetterSpacing;
