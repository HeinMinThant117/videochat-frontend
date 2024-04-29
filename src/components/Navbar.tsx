import brandLogo from "../assets/logo.png";
import { CircleUser, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b px-4 py-2 shadow-sm flex justify-between items-center">
      <img src={brandLogo} width={32} height={32} />
      <div className="flex items-center cursor-pointer">
        <CircleUser />
        <ChevronDown size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
