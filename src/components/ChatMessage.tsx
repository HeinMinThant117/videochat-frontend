const ChatMessage = () => {
  return (
    <div className="p-3">
      <div className="mb-1 flex gap-x-3">
        <div className="min-w-9"></div>
        <p className="text-xs text-gray-400">12:00AM</p>
      </div>
      <div className="inline-flex items-start gap-x-3">
        <img
          className="rounded-full"
          src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix"
          width={36}
          height={36}
        />
        <p className="max-w-96 rounded-md bg-slate-100 p-3 text-sm text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quam vel
          voluptate, error cumque suscipit! Explicabo architecto dignissimos
          consequuntur velit. Minima ex, quisquam ipsum quo ducimus adipisci
          doloribus numquam quam.
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
