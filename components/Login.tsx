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
      <h1 className="text-black text-sm bg-yellow-300 max-w-md mt-10 p-5 border rounded-md border-black">
        Disclaimer: This is just a demo app which simulates the original ChatGPT
        app and uses the ChatGPT API to demonstrate the capabilities of ReactJS
        and NextJS 13. Sign In using securely your Google account. The
        application will only have access to your email, user name, and profile
        picture to provide you with a more personalized user experience.
        <span className="font-bold">
          THIS IS NOT THE OFFICIAL ChatGPT PLATFORM.
        </span>
      </h1>
    </div>
  );
}

export default Login;
