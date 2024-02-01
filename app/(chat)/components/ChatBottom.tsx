"use client";

import { useRef } from "react";
import { ChatInput, ChatSendButton } from ".";

export function ChatBottom() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ChatInput type="text" ref={inputRef} className="text-neutral-950" />
      <ChatSendButton inputRef={inputRef}>전송</ChatSendButton>
    </>
  );
}
