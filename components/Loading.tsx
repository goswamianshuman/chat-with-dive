import React from "react";
import { Dive } from "@/public/assets";

type Props = {};

const Loading = (props: Props) => {
  return (
    <main className="h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        <Dive />
        <h2 className="font-semibold uppercase text-xl">chat with dive</h2>
      </div>

      <div className="flex items-center justify-center gap-3 mt-20">
        <div className="inline-block h-[40px] w-[40px] rounded-full border-[3px] border-solid border-[whitesmoke] border-r-transparent animate-spin" />
      </div>
    </main>
  );
};

export default Loading;
