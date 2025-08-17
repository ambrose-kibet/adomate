"use client";

import { ITextProps } from "fabric";
import { useState } from "react";
import { debounce } from "lodash";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FontSize: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
  currentFontSize?: number;
}> = ({ updateText, currentFontSize }) => {
  const [fontSize, setFontSize] = useState<number | undefined>(
    currentFontSize || 16
  );

  const incrementFontSize = () => {
    const newSize = fontSize ? fontSize + 1 : 17; // Increment font size
    setFontSize(newSize);
    updateText({ property: "fontSize", value: newSize });
  };
  const decrementFontSize = () => {
    const newSize = fontSize ? fontSize - 1 : 15; // Decrement font size
    setFontSize(newSize);
    updateText({ property: "fontSize", value: newSize });
  };

  return (
    <div className="flex items-center space-x-2">
      <button className="rounded p-1 ml-2" onClick={decrementFontSize}>
        <FaMinus className="h-3 w-3" />
      </button>
      <div className="w-10 border flex justify-center items-center rounded p-1">
        {fontSize}
      </div>
      <button className=" rounded p-1 mr-2" onClick={incrementFontSize}>
        <FaPlus className="h-3 w-3" />
      </button>
    </div>
  );
};

export default FontSize;
