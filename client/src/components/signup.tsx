import { useForm } from "react-hook-form";
import { signup } from "../api";

const Signup = () => {
  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const submitHandler = async (data: any) => {
    const res = await signup(data);
    console.log({ res });
    localStorage.setItem("user", JSON.stringify(data));
    reset();
  };
  return (
    <div>
      <form
        className="mx-auto flex flex-col gap-3 w-[50%] mt-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="font-bold text-3xl">Sign up</h1>
        <input
          type="text"
          required
          placeholder="Enter name"
          className="border-2 border-green-500 p-2 rounded-md"
          {...register("name")}
        />
        <input
          type="text"
          required
          placeholder="Enter email"
          className="border-2 border-green-500 p-2 rounded-md"
          {...register("email")}
        />
        <input
          type="password"
          required
          placeholder="Enter password   "
          className="border-2 border-green-500 p-2 rounded-md"
          {...register("password")}
        />
        <button className="p-3 bg-green-500 rounded-lg font-bold" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
