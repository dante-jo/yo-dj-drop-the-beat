"use client";

import { useSocket } from "@/libs/hooks";
import { useEffect, useState } from "react";
import { ChatList } from ".";
import { ChatBottom } from "./ChatBottom";

export function ChatContainer() {
  const [chatData, setChatData] = useState<IChat[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const messageListener = (message: IChat) => {
      console.log(message);
      setChatData((prev) => [...prev, message]);
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  return (
    <>
      <ChatList chatData={chatData} />
      <ChatBottom />
    </>
  );
}
