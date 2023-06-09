import googleImg from "../assets/google.png";
import { AiFillGithub } from "react-icons/ai";

const Login = () => {
  return (
    <div className=" w-full h-screen flex justify-center ">
      <div className=" w-[50%] h-fit bg-white flex flex-col px-12 md:pt-16 gap-y-4 pb-10">
        <div className=" w-full flex flex-col items-center justify-center text-center">
          <h1 className=" font-bold text-3xl">Welcome To Blog App</h1>
          <p className=" text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, reiciendis.
          </p>
        </div>
        <form className=" w-full h-fit flex flex-col gap-y-3">
          <div className=" w-full relative">
            <input className=" peer w-full p-4 rounded-md outline-none transition border border-gray-300 focus:border-blue-600" />
            <label className=" absolute duration-150 transform -translate-y-3 top-7 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 text-zinc-400">
              Email
            </label>
          </div>
          <div className=" w-full relative">
            <input className=" peer w-full p-4 rounded-md outline-none transition border border-gray-300 focus:border-blue-600" />
            <label className=" absolute duration-150 transform -translate-y-3 top-7 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 text-zinc-400">
              Password
            </label>
          </div>
        </form>
        <div className=" flex items-center justify-center text-zinc-500">
          <h1 className=" flex items-center gap-x-4  after:content-[''] after:h-[2px] after:flex-grow after:bg-zinc-300 before:content-[''] before:h-[2px] before:bg-zinc-300 col-span-3 before:flex-grow  w-full">
            Or login with providers
          </h1>
        </div>
        <div className=" w-full flex flex-col gap-y-2">
          <button className=" p-3 flex items-center gap-x-5 justify-center bg-white shadow-[0_0_0.8px_0] shadow-gray-400 rounded-md hover:bg-zinc-100 transition-colors duration-200 border border-gray-100">
            <div className=" w-6 h-full">
              <img src={googleImg} className=" w-full h-full" />
            </div>
            <span className=" font-medium">Login with google</span>
          </button>
          <button className=" p-3 flex items-center gap-x-5 justify-center bg-black text-white shadow-[0_0_0.8px_0] shadow-gray-400 rounded-md hover:bg-zinc-800 transition-colors duration-200">
            <div className=" w-6 h-full">
              <AiFillGithub className=" w-full h-full text-white" />
            </div>
            <span className=" font-medium">Login with github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
