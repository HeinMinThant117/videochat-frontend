import brandLogo from "../assets/logo.png";
import { CircleUser, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b px-4 py-2 shadow-sm">
      <img src={brandLogo} width={32} height={32} />
      <div className="flex cursor-pointer items-center">
        <CircleUser />
        <ChevronDown size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
