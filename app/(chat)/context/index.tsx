import { createContext, useContext, useState } from "react";

interface IChatContext {
  chatData: IChat[];
  userInput: string;
  author: string;
}

export const ChatContext = createContext<IChatContext | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("Chat context 안에 있어야 합니다.");
  }

  return context;
};

export function ChatProvider({ children }) {
  const inputState = useState("");

  return (
    <ChatContext.Provider value={{ ...inputState }}>
      {children}
    </ChatContext.Provider>
  );
}
