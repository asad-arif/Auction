import { useState } from "react";
import { useForm } from "react-hook-form";
import { editUser } from "../api";

const Profile = () => {
  const [isEdit, setIdEdit] = useState(false);
  const form = useForm();
  const { register, reset, handleSubmit } = form;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const submitHandler = async (data: any) => {
    const newUser = data.password
      ? { ...data }
      : { name: data?.name, email: data?.email };
    const res = await editUser(user?._id, newUser);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify({ ...user, ...newUser }));
      reset();
    }
  };

  return (
    <div className="bg-slate-100  flex flex-1 flex-col rounded-lg gap-2 w-[50%] mx-auto my-5 p-2">
      <div className="flex justify-between">
        <span className="font-bold ">My Profile</span>
        {isEdit ? (
          <span
            className=" bg-red-200 p-2 rounded-md cursor-pointer"
            onClick={() => {
              setIdEdit(false);
              reset();
            }}
          >
            Cancel
          </span>
        ) : (
          <span
            className="bg-yellow-200 p-2 rounded-md cursor-pointer"
            onClick={() => setIdEdit(true)}
          >
            Edit
          </span>
        )}
      </div>
      {isEdit ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="text"
            className="border-2 p-2 rounded-md"
            {...register("name")}
            placeholder="Please enter new name"
            defaultValue={user?.name}
          />
          <input
            type="text"
            className="border-2 p-2 rounded-md"
            {...register("email")}
            placeholder="Please enter new email"
            defaultValue={user?.email}
          />
          <input
            type="password"
            placeholder="New password"
            className="border-2  p-2 rounded-md"
            {...register("password")}
          />
          <button
            className="p-3 bg-green-500 rounded-lg font-bold"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="flex flex-col">
          <span>Name: {user?.name || ""}</span>
          <span>Email: {user?.email || ""}</span>
          <span>Password: ******** </span>
        </div>
      )}
    </div>
  );
};

export default Profile;
