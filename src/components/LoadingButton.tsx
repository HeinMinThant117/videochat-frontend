import { ClipLoader } from "react-spinners";

import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  title: string;
  loading: boolean;
}

const LoadingButton = ({ title, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <ClipLoader color="white" size={14} /> : title}
    </Button>
  );
};

export default LoadingButton;
