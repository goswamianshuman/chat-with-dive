"use client";
import React from "react";
import {
  RiCheckDoubleFill as DoubleTick,
  RiCheckFill as SingleTick,
} from "react-icons/ri";

type Props = {
  data: any;
  auth: any;
  receiver: any;
};

export default function Message({ data, auth, receiver }: Props) {
  return (
    <div
      className={`max-w-[350px] mt-3 ${
        data.senderId == auth.currentUser?.uid && "ml-auto"
      }`}
    >
      <div
        className={`text-sm py-5 px-6 ${
          data.senderId !== auth.currentUser?.uid
            ? "rounded-tl-none rounded-xl bg-[rgba(255,255,255,0.88)] text-[black] "
            : "rounded-tr-none rounded-xl bg-[rgba(73,11,109,0.4)] text-[whitesmoke]/80"
        }`}
      >
        <p className="leading-relaxed tracking-normal">{data.message}</p>
      </div>

      <div className="flex">
        <p
          className={`text-gray-400 font-light text-xs mt-1 ${
            data.senderId == auth.currentUser?.uid && "text-right"
          }`}
        >
          {new Date(data.timestamp).toLocaleString()}
        </p>

        {data.senderId == auth.currentUser?.uid && data.read ? (
          <DoubleTick
            className={`text-blue-600 font-light text-xs mt-1 ml-auto`}
          />
        ) : receiver?.status === "online" ||
          receiver?.lastseen >= data.timestamp ? (
          <DoubleTick
            className={`text-gray-600 font-light text-xs mt-1 ml-auto`}
          />
        ) : (
          <SingleTick
            className={`text-gray-600 font-light text-xs mt-1 ml-auto`}
          />
        )}
      </div>
    </div>
  );
}
