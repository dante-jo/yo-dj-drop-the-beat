import { ChatBubble } from ".";

interface ChatListProps {
  chatData: IChat[];
}

export function ChatList({ chatData }: ChatListProps) {
  return (
    <ul>
      {chatData.map(({ key, content }) => (
        <ChatBubble key={key} content={content} />
      ))}
    </ul>
  );
}
