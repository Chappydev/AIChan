import React, { useState } from "react";
import useAssistant from "@/hooks/useAssistant";
import useChat from "@/hooks/useChat";
import useOptions from "@/hooks/useOptions";
import { LineContext } from "@/contexts/LineContext";
import TextLinesView from "../TextLinesView";
import s from './LinesAssistant.module.scss';
import { AssistantChat } from "../AssistantChat";

export const LinesAssistant = ({ lines, currentLines, shown }) => {
  const [refLines, setRefLines] = useState([]);
  const { chat, setChat, ref: scrollRef, onComplete } = useChat(refLines);
  const options = useOptions(refLines, chat, setChat);
  const { isLoading, error } = useAssistant(chat, setChat);

  const [activeTab, setActiveTab] = useState('lines');

  return (
    <div className={s.textAndChatWrapper} style={{ flexGrow: shown ? 1 : 0 }}>
      <div className={s.tabs}>
        <div onClick={() => setActiveTab('lines')} data-active={(activeTab === "lines").toString()}>Lines</div>
        <div onClick={() => setActiveTab('chat')} data-active={(activeTab === "chat").toString()}>Chat</div>
      </div>
      <LineContext.Provider value={{ refLines, setRefLines }}>
        <div className={s.content}>
          {
            activeTab === 'lines'
              ? <TextLinesView lines={lines} currentLines={currentLines} />
              : <AssistantChat options={options} chat={chat} setChat={setChat} scrollRef={scrollRef} onComplete={onComplete} isLoading={isLoading} error={error} />
          }
        </div>
      </LineContext.Provider>
    </div>
  )
}
