import ChatMessage from "./ChatMessage";
import ChatSectionHeader from "./ChatSectionHeader";

interface ChatSectionProps {
  handleSidebarToggle: () => void;
}

const ChatSection = ({ handleSidebarToggle }: ChatSectionProps) => {
  return (
    <div className="flex-1 border-l border-b">
      <ChatSectionHeader handleSidebarToggle={handleSidebarToggle} />

      <div className="max-h-fit overflow-auto h-[calc(100vh_-_103px)]">
        {[...Array(10)].map(() => (
          <ChatMessage />
        ))}
      </div>
    </div>
  );
};

export default ChatSection;
