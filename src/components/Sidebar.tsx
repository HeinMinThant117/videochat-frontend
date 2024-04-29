import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="w-80 hidden md:block">
      <p className="font-bold border-b text-lg p-3">All Messages</p>
      <div>
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </div>
  );
};

export default Sidebar;
