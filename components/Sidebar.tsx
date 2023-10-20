"use client";

import Chat from "./Chat";

type Props = {
  allUsers: any;
};

export default function Sidebar({ allUsers }: Props) {
  return (
    <div className="border-r-[2px] border-[#2c2c2c2e] min-w-[300px] w-max max-w-[350px] overflow-y-scroll scrollbar-hide scroll-smooth transitionall ease-linear duration-100">
      <div className="w-full h-max mt-3">
        <div className="px-5">
          <button
            onClick={() => {
              alert("comming soon...");
            }}
            className="bg-[whitesmoke]/90 my-3 text-[#0b0c0e] px-4 py-3 text-xs uppercase tracking-wider font-medium rounded-md hover:bg-[whitesmoke]/90 active:bg-[whitesmoke] disabled:active:bg-[whitesmoke]/90 transition-all ease-linear duration-200 w-full disabled:cursor-not-allowed"
          >
            Start new chat
          </button>
        </div>

        {/* <Chat /> */}
        {allUsers.map((chat: any) => (
          <Chat
            key={chat.email}
            id={chat.uid}
            avatar={chat.profile_picture}
            status={chat.status}
            email={chat.email}
            name={chat.name}
          />
        ))}
      </div>
    </div>
  );
}
