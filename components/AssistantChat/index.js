import ChatBubble from "../ChatBubble";
import TextArea from "../TextArea";
import ChatLoadingBubble from "../ChatLoadingBubble";
import ChatInput from "../ChatInput";
import s from './AssistantChat.module.scss';

export const AssistantChat = ({ chat, setChat, options, scrollRef, onComplete, isLoading, error }) => {
  return (
    <div className={s.chatWrapper}>
      <div className={s.chatBubbles} ref={scrollRef}>
        {chat.map((message, ind) => {
          if (message.type === "initial") {
            return (
              <ChatBubble
                key={ind}
                initial={true}
                role={message.role}
                options={options}
              >
                {message.content}
              </ChatBubble>
            );
          } else if (message.waiting) {
            return (
              <ChatBubble key={ind} role={message.role}>
                <TextArea
                  content={message.content}
                  onComplete={onComplete}
                />
              </ChatBubble>
            );
          }

          return (
            <ChatBubble key={ind} role={message.role} options={options}>
              {message.content}
            </ChatBubble>
          );
        })}
        {isLoading && <ChatLoadingBubble />}
        {error && (
          <ChatBubble error={true} role="assistant">
            Something went wrong. You may have reached the request
            limit. Please try again later.
          </ChatBubble>
        )}
      </div>
      <ChatInput chat={chat} setChat={setChat} />
    </div>
  )
}
