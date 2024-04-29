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
    <div className="bg-white px-6 py-4 w-full rounded-md">
      <h1 className="font-bold text-center text-2xl mb-4">
        {currentForm === "login" ? "Login" : "Register"}
      </h1>
      {currentForm === "login" ? <LoginForm /> : <RegisterForm />}
      <p onClick={handleFormToggle} className="text-center mt-2 underline">
        {currentForm === "login" ? "Register" : "Login"}
      </p>
    </div>
  );
};

export default AuthForm;
