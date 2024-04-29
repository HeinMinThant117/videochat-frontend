import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="w-80 hidden md:block">
      <p className="font-bold border-b text-lg p-3">All Messages</p>
      <div className=" h-[calc(100vh_-_104px)] overflow-auto">
        {[...Array(20)].map(() => (
          <SidebarItem />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
