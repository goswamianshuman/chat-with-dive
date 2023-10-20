"use client";
import React from "react";
import { BsFillCaretDownFill as DownArrow } from "react-icons/bs";
import { Dive } from "@/public/assets";

export default function page() {
  return (
    <div className="flex-grow flex h-full">
      <div className="w-full max-w-[90%] mx-auto mt-4 flex-grow flex flex-col relative">
        <div className="max-h-[75vh] h-full overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col items-center justify-center gap-2 mt-36">
            <Dive />
            <h2 className="font-semibold uppercase text-xl">
              Start a new chat
            </h2>

            <div className="mt-4">
              <DownArrow className="text-white h-10 w-10 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
