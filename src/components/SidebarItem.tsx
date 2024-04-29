const SidebarItem = () => {
  return (
    <div className="py-3 px-4 border-b flex items-center gap-x-3 bg-slate-50">
      <img
        className="rounded-full"
        src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p>James</p>
          <p className="text-xs text-gray-400">1m</p>
        </div>
        <p className="text-sm text-gray-400">Can you see?</p>
      </div>
    </div>
  );
};

export default SidebarItem;
