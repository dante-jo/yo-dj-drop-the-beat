"use client";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ChatList } from ".";
import { ChatBottom } from "./ChatBottom";

export function ChatContainer() {
  const [connected, setConnected] = useState(false);
  const [chatData, setChatData] = useState<IChat[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socketRef.current = io();

      socketRef.current.on("connect", () => {
        console.log("connected", socketRef.current);
        setConnected(true);
      });

      socketRef.current.on("error", (error: any) => {
        console.error(error);
      });

      socketRef.current.on("message", (message: IChat) => {
        console.log(message);
        setChatData((prev) => [...prev, message]);
      });
    };

    socketInitializer();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <ChatList chatData={chatData} />
      <ChatBottom />
    </>
  );
}
