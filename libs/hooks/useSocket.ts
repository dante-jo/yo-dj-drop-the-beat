"use client";

import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;

    const socketInitializer = async () => {
      await fetch("/api/socket");

      socketRef.current = io();

      socketRef.current.on("connect", () => {
        console.log("connected", socketRef.current);
        setConnected(true);
      });

      socketRef.current.on("error", (error: unknown) => {
        console.error(error);
      });
    };

    socketInitializer();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  return { socket: socketRef.current, connected };
};
