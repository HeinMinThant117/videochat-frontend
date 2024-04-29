import { EllipsisVertical, Menu, Phone } from "lucide-react";

interface ChatSectionHeaderProps {
  handleSidebarToggle: () => void;
}

const ChatSectionHeader = ({ handleSidebarToggle }: ChatSectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center gap-x-3">
        <Menu className="md:hidden" onClick={handleSidebarToggle} />
        <img
          className="rounded-full"
          src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix"
          width={36}
          height={36}
        />
        <p>James</p>
      </div>
      <div className="mr-2 flex items-center gap-x-3">
        <Phone size={16} />
        <EllipsisVertical size={16} />
      </div>
    </div>
  );
};

export default ChatSectionHeader;
