const SidebarItem = () => {
  return (
    <div className="flex items-center gap-x-3 border-b bg-slate-50 px-4 py-3">
      <img
        className="rounded-full"
        src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p>James</p>
          <p className="text-xs text-gray-400">1m</p>
        </div>
        <p className="text-sm text-gray-400">Can you see?</p>
      </div>
    </div>
  );
};

export default SidebarItem;
