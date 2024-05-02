import ChatMessage from "./ChatMessage";
import ChatSectionHeader from "./ChatSectionHeader";

interface ChatSectionProps {
  handleSidebarToggle: () => void;
}

const ChatSection = ({ handleSidebarToggle }: ChatSectionProps) => {
  return (
    <div className="flex-1 border-b border-l">
      <ChatSectionHeader handleSidebarToggle={handleSidebarToggle} />

      <div className="h-[calc(100vh_-_103px)] max-h-fit overflow-auto">
        {[...Array(10)].map((_ele, index) => (
          <ChatMessage key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChatSection;
