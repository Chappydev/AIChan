import React, { useState } from "react";
import useAssistant from "@/hooks/useAssistant";
import useChat from "@/hooks/useChat";
import useOptions from "@/hooks/useOptions";
import { LineContext } from "@/contexts/LineContext";
import TextLinesView from "../TextLinesView";
import ChatBubble from "../ChatBubble";
import TextArea from "../TextArea";
import ChatLoadingBubble from "../ChatLoadingBubble";
import ChatInput from "../ChatInput";
import s from './LinesAssistant.module.scss';

export const LinesAssistant = ({ lines, shown }) => {
  const [refLines, setRefLines] = useState([]);
  const { chat, setChat, ref: scrollRef, onComplete } = useChat(refLines);
  const options = useOptions(refLines, chat, setChat);
  const { isLoading, error } = useAssistant(chat, setChat);

  return (
    <div className={s.textAndChatWrapper} style={{ flexGrow: shown ? 1 : 0 }}>
      <LineContext.Provider value={{ refLines, setRefLines }}>
        <TextLinesView lines={lines} />
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
      </LineContext.Provider>
    </div>
  )
}
