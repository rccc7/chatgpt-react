"use client";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={
          "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        }
        width={300}
        height={300}
        alt="logo"
        aria-owns=""
        title="ChatGPT, Public domain, via Wikimedia Commons"
        // attribution="ChatGPT, Public domain, via Wikimedia Commons"
      />
      <button
        className="text-white font-bold text-3xl animate-pulse pt-4"
        // Here, if we pass google as a parameter then NextAuth will automatically login with google
        //instead of listing the auth providers first.
        onClick={() => signIn("google")}
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
