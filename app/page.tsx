"use client";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { Dive } from "@/public/assets";

export default function SignIn() {
  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/chats");
  }, [user]);

  // googlelogin
  const googleLogin = async () => {
    const GoogleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, GoogleProvider).catch((error) => {
      console.log(error);
    });
  };

  // github login
  const githubLogin = async () => {
    const GithubProvider = new GithubAuthProvider();

    await signInWithPopup(auth, GithubProvider).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-2">
          <Dive />
          <h2 className="font-semibold uppercase text-xl">chat with dive</h2>
        </div>
        <div className="min-h-max min-w-[400px] px-10 py-10 bg-[#1c1c1c] rounded-md shadow-lg shadow-black/20 mt-4 flex flex-col gap-4">
          <button
            onClick={googleLogin}
            className="border border-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-3 hover:bg-black/20 transition-all ease-linear duration-200 active:bg-black/30"
          >
            <GoogleIcon className=" h-6 w-6 " /> Log in with google
          </button>

          <button
            onClick={githubLogin}
            className="border border-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-3 hover:bg-black/20 transition-all ease-linear duration-200 active:bg-black/30"
          >
            <GithubIcon className="text-white h-6 w-6 " /> Log in with Github
          </button>
        </div>
      </div>
    </>
  );
}
