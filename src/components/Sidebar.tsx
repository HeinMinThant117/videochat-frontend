import { X } from "lucide-react";

import SidebarItem from "./SidebarItem";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }: SidebarProps) => {
  return (
    <div
      className={`absolute ${isSidebarOpen ? "w-full" : "w-0"} overflow-hidden md:relative md:block md:w-80`}
    >
      <div className="flex items-center justify-between border-b bg-white p-3 text-lg font-bold">
        <p>All Messages</p>
        <X onClick={handleSidebarToggle} size={20} className="mt-1 md:hidden" />
      </div>
      <div className=" h-[calc(100vh_-_104px)] overflow-auto">
        {[...Array(20)].map(() => (
          <SidebarItem />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
