import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  const navigate = useNavigate();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
              navigate("/login");
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
};

export default MainLayout;
