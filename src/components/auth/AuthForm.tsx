import LoginForm from "./LoginForm";

const AuthForm = () => {
  return (
    <div className="bg-white px-6 py-4 w-full">
      <h1 className="font-bold text-center text-2xl mb-4">Login</h1>
      <LoginForm />
      <p className="text-center mt-2 underline">Register</p>
    </div>
  );
};

export default AuthForm;
