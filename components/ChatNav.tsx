"use client";

import { Avatar } from "@mui/material";
import React from "react";

type Props = {
  profileURL: any;
  status: any;
  name: any;
};

export default function ChatNav({ name, profileURL, status }: Props) {
  return (
    <>
      <div className="flex items-center gap-3 py-3 absolute top-0 bg-[#0b0c0e] w-full">
        <Avatar src={profileURL}></Avatar>
        <div>
          <p className="font-medium text-sm leading-relaxed tracking-wide capitalize">
            {name}
          </p>
          <p className="font-thin text-xs leading-relaxed tracking-normal">
            {status !== "online" && "Last Seen:"} <span>{status}</span>
          </p>
        </div>
      </div>
    </>
  );
}
