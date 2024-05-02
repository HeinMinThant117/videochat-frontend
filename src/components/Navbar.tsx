import { PopoverContent } from "@radix-ui/react-popover";
import { ChevronDown, CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useUser from "@/hooks/useUser";

import brandLogo from "../assets/logo.png";
import { Popover, PopoverTrigger } from "./ui/popover";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b px-4 py-2 shadow-sm">
      <img src={brandLogo} width={32} height={32} />
      <Popover>
        <PopoverTrigger>
          <div className="flex cursor-pointer items-center">
            <CircleUser />
            <p className="mx-2 text-sm">{user?.username}</p>
            <ChevronDown size={20} />
          </div>
        </PopoverTrigger>

        <PopoverContent className="rounded-md bg-black px-6 py-2 text-sm text-white">
          <p className="cursor-pointer" onClick={logout}>
            Logout
          </p>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
