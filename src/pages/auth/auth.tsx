import AuthForm from "@/components/auth/AuthForm";
import authBg from "../../assets/auth-bg.jpg";

const AuthPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 hidden md:block">
        <img
          className="w-full h-full object-cover"
          src={authBg}
          alt="abstract login background art"
        />
      </div>
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center px-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
