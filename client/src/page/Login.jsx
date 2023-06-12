import { Input } from "../components/Input";
import googleImg from "../assets/google.png";
import { AiFillGithub } from "react-icons/ai";
import { ButtonAuth } from "../components/ButtonAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { credentialsReq } from "../axios/requestMethod";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("please enter password").min(6, "Password must have at least 8 characters"),
});

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const watchValue = watch();

  const onSubmit = async (payload) => {
    try {
      const { data } = await credentialsReq.post("/login", payload);
      if (data) {
        setCurrentUser(data);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className=" w-full h-screen flex justify-center ">
      <div className=" w-[50%] h-fit bg-white flex flex-col px-12 md:pt-16 gap-y-4 pb-10">
        <div className=" w-full flex flex-col items-center justify-center text-center">
          <h1 className=" font-bold text-3xl">Welcome To Blog App</h1>
          <p className=" text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, reiciendis.
          </p>
        </div>
        <form className=" w-full h-fit flex flex-col gap-y-3 " onSubmit={handleSubmit(onSubmit)}>
          <Input value="email" label="Email" register={register} watchValue={watchValue.email} errors={errors.email} />
          <Input
            value="password"
            label="Password"
            register={register}
            watchValue={watchValue.password}
            errors={errors.password}
          />
          <ButtonAuth
            value="Continue"
            bgColor="bg-blue-700"
            textColor="text-white"
            hoverColor="hover:bg-blue-500"
            type="submit"
          />
        </form>
        <div className=" flex items-center justify-center text-zinc-500">
          <h1 className=" flex items-center gap-x-4  after:content-[''] after:h-[2px] after:flex-grow after:bg-zinc-300 before:content-[''] before:h-[2px] before:bg-zinc-300 col-span-3 before:flex-grow  w-full">
            Or login with providers
          </h1>
        </div>
        <div className=" w-full flex flex-col gap-y-2">
          <ButtonAuth
            value="Login with google"
            icon={googleImg}
            hoverColor="hover:bg-zinc-100"
            textColor="text-black"
          />
          <ButtonAuth
            value="Login with github"
            icon2={<AiFillGithub className=" w-full h-full" />}
            shadow={true}
            bgColor="bg-zinc-900"
            textColor="text-white"
            hoverColor="hover:bg-zinc-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
