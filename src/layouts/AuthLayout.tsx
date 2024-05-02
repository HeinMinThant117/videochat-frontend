import { useQuery } from "@tanstack/react-query";

import axios from "@/lib/axios";

const AuthLayout = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: () => {
      return axios.get("/user");
    },
  });

  return query;
};

export default AuthLayout;
