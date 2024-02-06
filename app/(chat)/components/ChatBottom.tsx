import { KeyboardEventHandler, useRef } from "react";
import { ChatInput, ChatSendButton } from ".";

let isSending = false;

export function ChatBottom() {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!inputRef.current) return;

    const content = inputRef.current.value;

    try {
      const messageData = new FormData();

      messageData.append("author", "tester");
      messageData.append("content", content);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: messageData,
      });
    } catch (err) {
      // do nothing
      console.log(err);
    }

    inputRef.current.value = "";
  };

  const onChatInputEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isSending) return;

    if (e.key === "Enter") {
      isSending = true;
      sendMessage();
      setTimeout(() => {
        isSending = false;
      }, 200);
    }
  };

  return (
    <>
      <ChatInput
        type="text"
        ref={inputRef}
        className="text-neutral-950"
        onKeyDown={onChatInputEnter}
      />
      <ChatSendButton inputRef={inputRef} sendMessage={sendMessage}>
        전송
      </ChatSendButton>
    </>
  );
}
