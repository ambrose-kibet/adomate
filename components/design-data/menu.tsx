import {
  Blend,
  Images,
  Minus,
  Palette,
  Settings,
  Shapes,
  Square,
  SquareRoundCorner,
  Type,
} from "lucide-react";
import BackgroundSettings from "../background-settings";
import ImageUpload from "../image-upload";
import ElementsSettings from "../elements-settings";
import TextSettings from "../text-settings";

interface SidebarMenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component?: React.ReactNode; // Optional component for rendering
}

const sidebarMenu: SidebarMenuItem[] = [
  {
    title: "Elements",
    description: "Add shapes and design elements",
    icon: Shapes,
    component: <ElementsSettings />,
  },
  {
    title: "Images",
    description: "Set image as background",
    icon: Images,
    component: <ImageUpload maxFiles={1} />,
  },
  {
    title: "Text",
    description: "Add text and Headings",
    icon: Type,
    component: <TextSettings />,
  },
  {
    title: "Settings",
    description: "Update Canvas  background color",
    icon: Settings,
    component: <BackgroundSettings />,
  },
];

const shapeList = [
  {
    name: "circle",
    src: "/shapes/circle.svg",
  },
  {
    name: "rectangle",
    src: "/shapes/rectangle.svg",
  },
  {
    name: "triangle",
    src: "/shapes/triangle.svg",
  },
];

const shapeSettings = [
  {
    name: "Fill",
    icon: Palette,
  },
  {
    name: "Stroke Color",
    icon: Square,
  },
  {
    name: "Stroke Width",
    icon: Minus,
  },
  {
    name: "Opacity",
    icon: Blend,
  },
  { name: "Rounded Corners", icon: SquareRoundCorner },
];

export { sidebarMenu, shapeList, shapeSettings };
