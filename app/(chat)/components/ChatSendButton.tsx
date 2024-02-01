import { Button, ButtonProps } from "@/components";
import { RefObject } from "react";

interface ChatSendButtonProps extends Omit<ButtonProps, "onClick"> {
  inputRef: RefObject<HTMLInputElement>;
}

export function ChatSendButton({
  inputRef,
  children,
  ...props
}: ChatSendButtonProps) {
  const onClickChatSendButton = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <Button {...props} onClick={onClickChatSendButton}>
      {children}
    </Button>
  );
}
