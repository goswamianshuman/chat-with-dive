"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Avatar } from "@mui/material";

type Props = {
  id: string;
  avatar: string;
  name: string;
  status: string;
  email: string;
};

function Chat({ id, avatar, email, name, status }: Props) {
  const router = useRouter();

  const enterChat = () => {
    router.push(`/chats/${id}`);
  };

  return (
    <div
      onClick={enterChat}
      className="flex px-5  gap-2 w-full border-b border-[whitesmoke]/10 hover:bg-black/20 py-4 cursor-pointer"
    >
      <div className="h-[40px] w-[40px] rounded-full relative">
        {avatar ? ( // Check if recipient data exists
          <Avatar src={avatar} />
        ) : (
          <Avatar>{name}</Avatar>
        )}
        <div
          className={`h-3 w-3 ${
            status == "online" ? "bg-lime-500" : "bg-red-500"
          } shadow-sm shadow-black/10 rounded-full absolute top-0 right-0`}
        />
      </div>
      <div className="text-xs flex flex-col items-start  justify-center">
        <p className="text-sm font-medium capitalize">
          {name || "Recipient Name"}
        </p>
        <p>{email || "Recipient Email"}</p>
      </div>
    </div>
  );
}

export default Chat;
