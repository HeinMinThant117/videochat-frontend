import authBg from "../../assets/auth-bg.jpg";

const AuthPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          className="w-full h-full object-cover"
          src={authBg}
          alt="abstract login background art"
        />
      </div>
      <div className="w-1/2 bg-black flex items-center justify-center px-10">
        <form className="bg-white w-full max-w-xl rounded-md py-4 px-6">
          <h1 className="text-center font-bold text-3xl">Login</h1>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
