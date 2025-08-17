"use client";
import { ChromePicker, CirclePicker } from "react-color";

const ColorPicker: React.FC<{
  value: string;
  onColorChange: (color: string) => void;
}> = ({ value, onColorChange }) => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <ChromePicker
        color={value}
        onChangeComplete={(e) => onColorChange(e.hex)}
      />
      <CirclePicker
        color={value}
        onChangeComplete={(e) => onColorChange(e.hex)}
      />
    </div>
  );
};
export default ColorPicker;
