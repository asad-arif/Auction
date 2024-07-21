import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, reset } = form;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const submitHandler = async (data: any) => {
    const res = await login(data);
    console.log(res);
    if (res.data.length) {
      localStorage.setItem("user", JSON.stringify(res.data[0]));
      reset();
      navigate("/home");
    }
  };

  useEffect(() => {
    if (user?.name) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <form
        className="mx-auto flex flex-col gap-3 w-[50%] mt-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="font-bold text-3xl">Login</h1>
        <input
          {...register("email")}
          type="text"
          required
          placeholder="Enter email"
          className="border-2 border-green-500 p-2 rounded-md"
        />
        <input
          {...register("password")}
          type="password"
          required
          className="border-2 border-green-500 p-2 rounded-md"
        />
        {/* <Link to={""} className="self-end">
          Forget Password?
        </Link> */}
        <button className="p-3 bg-green-500 rounded-lg font-bold" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
