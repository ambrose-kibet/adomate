"use client";

import { useState } from "react";
import { sidebarMenu } from "@/components/design-data/menu";
import SidebarMenu from "@/components/sidebar-menu";
const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | undefined>(undefined);
  return (
    <div className="grid grid-cols-[120px_1fr] items-start py-2 pt-4 min-h-full  ">
      <div className="flex flex-col items-center space-y-4">
        {sidebarMenu.map((item, i) => (
          <div
            key={item.title}
            className="flex flex-col items-center space-y-2 p-1  cursor-pointer group "
            onClick={() => setActiveMenu(i)}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-muted font-semibold ${
                activeMenu === i
                  ? "bg-primary text-primary-foreground "
                  : "bg-muted"
              } group-hover:bg-accent group-hover:text-primary transition-colors duration-300 ease-in-out   `}
            >
              <item.icon />
            </div>
            <h2
              className={`text-sm font-medium ${
                activeMenu === i ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.title}
            </h2>
          </div>
        ))}
      </div>
      <SidebarMenu settingsIdx={activeMenu} />
    </div>
  );
};
export default Sidebar;
