"use client";
import { sidebarMenu } from "@/components/design-data/menu";

type Props = { settingsIdx?: number };
const SidebarMenu: React.FC<Props> = ({ settingsIdx }) => {
  if (settingsIdx === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col items-start pt-4 h-full border-l border-l--gray-200 px-2">
      <h2 className="text-lg text-center font-semibold mb-1">
        {sidebarMenu[settingsIdx].title}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 ">
        {sidebarMenu[settingsIdx].description}
      </p>
      {sidebarMenu[settingsIdx].component}
    </div>
  );
};
export default SidebarMenu;
