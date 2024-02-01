import { Button, ButtonProps } from "@/components";
import { RefObject } from "react";

interface ChatSendButtonProps extends Omit<ButtonProps, "onClick"> {
  inputRef: RefObject<HTMLInputElement>;
  sendMessage: () => void;
}

export function ChatSendButton({
  inputRef,
  sendMessage,
  children,
  ...props
}: ChatSendButtonProps) {
  return (
    <Button {...props} onClick={sendMessage}>
      {children}
    </Button>
  );
}
