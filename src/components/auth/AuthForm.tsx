import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {
  const [currentForm, setCurrentForm] = useState<"login" | "register">("login");

  const handleFormToggle = () => {
    if (currentForm === "login") {
      setCurrentForm("register");
    } else {
      setCurrentForm("login");
    }
  };

  return (
    <div className="w-full rounded-md bg-white px-6 py-4">
      <h1 className="mb-4 text-center text-2xl font-bold">
        {currentForm === "login" ? "Login" : "Register"}
      </h1>
      {currentForm === "login" ? <LoginForm /> : <RegisterForm />}
      <p onClick={handleFormToggle} className="mt-2 text-center underline">
        {currentForm === "login" ? "Register" : "Login"}
      </p>
    </div>
  );
};

export default AuthForm;
