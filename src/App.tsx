import ChatSection from "./components/ChatSection";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <main className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <ChatSection />
      </div>
    </main>
  );
};

export default App;
