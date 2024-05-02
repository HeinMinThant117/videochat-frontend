import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export default MainLayout;
