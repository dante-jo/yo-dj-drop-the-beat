export function ChatBubble({ content }: Pick<IChat, "content">) {
  return <li>{content}</li>;
}
