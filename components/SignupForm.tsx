import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const router = useRouter();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axios.post("http://localhost:5000/api/users", data);
      const json = await res.data;
      return json;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      router.push(`/otp?email=${encodeURIComponent(data.user.email)}`);
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch("password");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signUp(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl px-6 py-8 border rounded-lg shadow-lg bg-yellow-200 text-black"
    >
      <h1 className="text-4xl font-semibold  text-center mb-5">
        Create an Account
      </h1>
      <div className="mb-4">
        <label htmlFor="username" className="font-bold">
          Username
        </label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="username"
              className="mt-2 h-10 px-4 py-2 block w-full text-gray-800 sm:text-sm rounded-md shadow-md outline-none "
              placeholder="Username"
            />
          )}
        />
        {errors.username && (
          <span className="text-red-600 mt-1">{errors.username.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className=" font-bold">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="email"
              className="mt-2 h-10 px-4 py-2 block w-full text-gray-800 sm:text-sm rounded-md shadow-md outline-none "
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <span className="text-red-600 mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className=" font-bold">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required", minLength: 6 }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              id="password"
              className="mt-2 h-10 px-4 py-2 block w-full text-gray-800 sm:text-sm rounded-md shadow-md outline-none "
              placeholder="Password"
            />
          )}
        />
        {errors.password && (
          <span className="text-red-600 mt-1">{errors.password.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className=" font-bold">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              id="confirmPassword"
              className="mt-2 h-10 px-4 py-2 block w-full text-gray-800 sm:text-sm rounded-md shadow-md outline-none "
              placeholder="Confirm Password"
            />
          )}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div>
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:text-blue-600 font-bold">
          Login
        </a>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="mt-4 bg-green-900 hover:bg-green-950 text-white  font-semibold text-sm w-full px-6 py-2 rounded-md outline-none"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
