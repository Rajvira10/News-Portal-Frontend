"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";

type Inputs = {
  otp: string;
  email: string | null;
};

const Page = ({}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { mutate: checkOTP, isLoading } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        data
      );
      const json = await res.data;
      return json;
    },
    onError: (error: any) => {
      toast.error("OTP verification failed", {
        duration: 5000,
        description: error.response.data.error,
      });
    },
    onSuccess: async (data) => {
      toast.success("OTP verified successfully");
      dispatch(logIn(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    },
  });

  const handleClick = () => {
    checkOTP({
      otp: otp,
      email: searchParams.get("email"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border-white border p-8 rounded-lg shadow-md w-96 text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="otp" className="block">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              className="mt-2 h-10 px-4 pt-2 pb-3 block w-full sm:text-sm rounded-md shadow outline-none border border-[#27272A] focus:border-slate-200 bg-inherit text-white"
              placeholder="ENTER OTP"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-white font-semibold text-black text-sm w-full px-6 py-2 rounded-md hover:bg-gray-100 outline-none"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              disabled={isLoading}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
