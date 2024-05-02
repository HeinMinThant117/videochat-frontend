import { ChevronDown, CircleUser } from "lucide-react";

import useUser from "@/hooks/useUser";

import brandLogo from "../assets/logo.png";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between border-b px-4 py-2 shadow-sm">
      <img src={brandLogo} width={32} height={32} />
      <div className="flex cursor-pointer items-center">
        <CircleUser />
        <p className="mx-2 text-sm">{user?.username}</p>
        <ChevronDown size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
