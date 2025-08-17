"use client";
import { RootState } from "@/lib/redux/store";
import { FaLayerGroup } from "react-icons/fa";
import { useSelector } from "react-redux";

const ToggleGroupComponent: React.FC = () => {
  const {
    canvas: { selectedObjects, canvasInstance },
  } = useSelector((state: RootState) => state);

  const toggleGroup = () => {};
  return <div>GroupComponent</div>;
};
export default ToggleGroupComponent;
