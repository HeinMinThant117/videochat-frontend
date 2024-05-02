import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";
import { AuthUser } from "@/types/User";

const useUser = () => {
  const { data: user } = useQuery<AuthUser>({
    queryKey: ["authUser"],
    queryFn: () => {
      return axios.get("/user").then((response) => response.data.user);
    },
    refetchOnMount: false,
  });

  return { user };
};

export default useUser;
