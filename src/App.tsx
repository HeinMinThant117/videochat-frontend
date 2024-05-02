import { useState } from "react";

import ChatSection from "./components/ChatSection";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useUser from "./hooks/useUser";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useUser();

  const handleSideBarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSideBarToggle}
        />
        <ChatSection handleSidebarToggle={handleSideBarToggle} />
      </div>
    </main>
  );
};

export default App;
