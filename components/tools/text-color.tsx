"use client";
import { ImTextColor } from "react-icons/im";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ColorPicker from "../color-picker";
import { useState } from "react";
import { debounce } from "lodash";
import { Slider } from "@/components/ui/slider";
import type { ITextProps } from "fabric";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const TextColor: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
}> = ({ updateText }) => {
  const { canvasInstance } = useSelector((state: RootState) => state.canvas);
  if (!canvasInstance) return null;

  const [color, setColor] = useState<string>("#000000");
  const [opacity, setOpacity] = useState<number>(1);

  const updateColor = (color: string) => {
    setColor(color);
    debounce(() => {
      updateText({ property: "fill", value: color });
    }, 300)();
  };

  const updateOpacity = (opacity: number) => {
    setOpacity(opacity);
    debounce(() => {
      updateText({ property: "opacity", value: opacity });
    }, 300)();
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">
          <ImTextColor />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <ColorPicker value={color} onColorChange={updateColor} />
        <div className="text-sm text-gray-500 mt-2">Opacity</div>
        <Slider
          value={[opacity]}
          onValueChange={(value) => updateOpacity(value[0])}
          className="mt-2"
          defaultValue={[1]}
          step={0.1}
          min={0}
          max={1}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
export default TextColor;
