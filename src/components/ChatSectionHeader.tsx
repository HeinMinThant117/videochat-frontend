import { Phone, EllipsisVertical, Menu } from "lucide-react";

interface ChatSectionHeaderProps {
  handleSidebarToggle: () => void;
}

const ChatSectionHeader = ({ handleSidebarToggle }: ChatSectionHeaderProps) => {
  return (
    <div className="border-b p-2 flex items-center justify-between">
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
      <div className="flex items-center gap-x-3 mr-2">
        <Phone size={16} />
        <EllipsisVertical size={16} />
      </div>
    </div>
  );
};

export default ChatSectionHeader;
