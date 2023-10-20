"use client";
import ChatNav from "@/components/ChatNav";
import Message from "@/components/Message";
import { RiSendPlaneFill as Send } from "react-icons/ri";
import { useAllUsersContext } from "@/context/AllUsersContext";
import { auth } from "@/firebase/config";
import { getMessagesRef, sendMessage } from "@/firebase/messages";
import { child, off, onValue, update } from "firebase/database";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Chat() {
  const { userId }: { userId: string } = useParams();
  const { allUsers }: any = useAllUsersContext();
  const receiver = allUsers.filter((user: any) => user.uid == userId)[0];

  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<any[]>([]);

  useEffect(() => {
    onValue(
      getMessagesRef(auth.currentUser?.uid!, userId),
      async (snapshot) => {
        if (snapshot.exists()) {
          const messages: any[] = [];
          snapshot.forEach((childSnapshot) => {
            if (
              !childSnapshot.val().read &&
              childSnapshot.val().receiverId == auth.currentUser?.uid
            ) {
              update(
                child(
                  getMessagesRef(auth.currentUser?.uid!, userId),
                  childSnapshot.key
                ),
                {
                  read: true,
                }
              )
                .then(() => {
                  messages.push({
                    ...childSnapshot.val(),
                    id: childSnapshot.key,
                  });
                })
                .finally(() => {
                  setMessages(messages);
                });
            } else {
              messages.push({
                ...childSnapshot.val(),
                id: childSnapshot.key,
              });
              setMessages(messages);
            }
          });
        }
      }
    );
    return () => {
      off(getMessagesRef(auth.currentUser?.uid!, userId));
    };
  }, [auth.currentUser?.uid, userId]);

  return (
    <div className="flex-grow flex h-full">
      <div className="w-full max-w-[90%] mx-auto mt-4 flex-grow flex flex-col relative">
        <div className="max-h-[75vh] h-full overflow-y-scroll scrollbar-hide ">
          {/* chats */}
          <ChatNav
            profileURL={receiver?.profile_picture}
            status={receiver?.status}
            name={receiver?.name}
          />

          <div className="mt-20" />
          {messages.map((message: any, i: number) => {
            return (
              <Message key={i} data={message} auth={auth} receiver={receiver} />
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 mb-5">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="py-4 px-5 flex-grow outline-none rounded-md bg-black/20 placeholder:text-[whitesmoke]/20 placeholder:tracking-wide border border-solid border-[whitesmoke]/10 hover:border-[whitesmoke]/20
          focus:border-[whitesmoke]/30 transition-all ease-linear duration-200 text-sm"
            placeholder="Enter Chat here"
          />

          <button
            onClick={(e) => {
              sendMessage(auth.currentUser?.uid!, userId, message);
              setMessage("");
            }}
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
