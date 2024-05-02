import AuthForm from "@/components/auth/AuthForm";

import authBg from "../../assets/auth-bg.jpg";

const AuthPage = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden w-1/2 md:block">
        <img
          className="h-full w-full object-cover"
          src={authBg}
          alt="abstract login background art"
        />
      </div>
      <div className="flex w-full items-center justify-center bg-black px-10 md:w-1/2">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
