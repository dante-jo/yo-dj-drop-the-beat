import { Input, InputProps } from "@/components";
import React, { ReactNode, forwardRef } from "react";

export const ChatInput = forwardRef<HTMLInputElement, InputProps>(
  function ChatInput({ ...props }, ref) {
    return <Input ref={ref} {...props} />;
  }
);
