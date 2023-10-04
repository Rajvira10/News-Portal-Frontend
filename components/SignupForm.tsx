"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axios.post("http://localhost:3000/api/users", data);
      const json = await res.data;
      return json;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {},
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
      className="mx-auto max-w-2xl px-16 py-20 border-[#27272A] border-2 rounded-lg shadow-2xl"
    >
      <h1 className="text-2xl font-semibold text-white text-center mb-5">
        Create an account
      </h1>
      <div className="mb-2">
        <label htmlFor="username" className="text-white font-medium ">
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
              className="mt-2 h-10 px-4 pt-2 pb-3 block w-full sm:text-sm rounded-md shadow outline-none border border-[#27272A] focus:border-slate-200 bg-inherit text-white"
              placeholder="Username"
            />
          )}
        />
        {errors.username && (
          <span className="text-red-600 mt-1">{errors.username.message}</span>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="text-white font-medium">
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
              className="mt-2 h-10 px-4 pt-2 pb-3 block w-full sm:text-sm rounded-md shadow outline-none border border-[#27272A] focus:border-slate-200 bg-inherit text-white"
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <span className="text-red-600 mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="text-white font-medium">
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
              className="mt-2 h-10 px-4 pt-2 pb-3 block w-full sm:text-sm rounded-md shadow outline-none border border-[#27272A] focus:border-slate-200 bg-inherit text-white"
              placeholder=""
            />
          )}
        />
        {errors.password && (
          <span className="text-red-600 mt-1">{errors.password.message}</span>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="confirmPassword" className="text-white font-medium">
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
              className="mt-2 h-10 px-4 pt-2 pb-3 block w-full sm:text-sm rounded-md shadow outline-none border border-[#27272A] focus:border-slate-200 bg-inherit text-white"
              placeholder=""
            />
          )}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="mt-4 bg-white font-semibold text-black text-sm w-full px-6 py-2 rounded-md hover:bg-gray-100 outline-none"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
