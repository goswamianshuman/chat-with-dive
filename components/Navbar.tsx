"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Avatar } from "@mui/material";
import { CiMenuKebab as Menu } from "react-icons/ci";

type Props = {
  profilePhoto: string;
  useName: string;
  userEmail: string;
  logout: any;
};

export default function Navbar({
  profilePhoto,
  useName,
  userEmail,
  logout,
}: Props) {
  const router = useRouter();
  const [show, setShow] = React.useState(false);

  return (
    <div className="py-3 shadow-lg shadow-purple-900/10 w-full bg-[#08090b]">
      <div className="max-w-[95%] w-full mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="relative h-[50px] w-[100px]">
          <Image
            src="/images/dive.png"
            alt="logo"
            fill
            className="object-center object-contain"
          />
        </div>

        <div className="flex items-center justify-center gap-1 relative">
          {/* dots */}

          <button onClick={() => setShow(!show)}>
            <Menu className="h-6 w-6" />
          </button>

          <div
            data-show={show}
            className={`absolute bg-[whitesmoke] py-5 px-4 text-black right-2 rounded-md rounded-tr-none shadow-xl shadow-black translate-y-[65%] data-[show="false"]:translate-x-[8px] data-[show="false"]:hidden min-w-[250px] min-h-max data-[show="false"]:min-h-0 data-[show="false"]:min-w-0 transition-all ease-linear duration-200 z-20`}
          >
            <div
              data-show={show}
              className={`data-[show="false"]:invisible visible flex items-center justify-center flex-col gap-2`}
            >
              <div className="flex items-center justify-center gap-2">
                <Avatar
                  src={profilePhoto}
                  className="border-[3px] border-[#0b0c0e]/50"
                />
                {/* <img src={user.photoURL} alt="" /> */}
              </div>
              <div className="text-[10px] flex flex-col items-center justify-center">
                <p className="text-sm font-medium">{useName}</p>
                <p className="text-sm font-medium">{userEmail}</p>
                <div className="flex items-center justify-center gap-1 uppercase">
                  <div className="h-2 w-2 bg-lime-500 rounded-full " />
                  <p>online</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="bg-[#0b0c0e]/90 text-[whitesmoke] px-4 py-3 text-xs uppercase tracking-wider font-medium rounded-md hover:bg-[#0b0c0e]/90 active:bg-[#0b0c0e] transition-all ease-linear duration-200 w-full"
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
