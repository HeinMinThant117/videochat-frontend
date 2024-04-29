import SidebarItem from "./SidebarItem";
import { X } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }: SidebarProps) => {
  return (
    <div
      className={`absolute ${isSidebarOpen ? "w-full" : "w-0"} overflow-hidden md:block md:relative md:w-80`}
    >
      <div className="font-bold border-b text-lg p-3 bg-white flex items-center justify-between">
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
