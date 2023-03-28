import Head from "next/head";
import s from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";
import TextLine from "@/components/TextLine";
import ChatBubble from "@/components/ChatBubble";
import { LineContext } from "@/contexts/LineContext";
import ChatInput from "@/components/ChatInput";
import useAssistant from "@/hooks/useAssistant";
import useOptions from "@/hooks/useOptions";
import useChat from "@/hooks/useChat";
import ChatLoadingBubble from "@/components/ChatLoadingBubble";

const lines = [
  "大使館まではどれくらいかね。",
  "恐らく、２０分程度かと…。",
  "あれ？ブレーキが…。",
  "あっ…お…おい！",
  "君！前！前！",
  "ああっ！",
  "オスタニアにおいて、我が国の外交官が事故死した。だが当局は、東の極右政党による、暗殺と見ている。",
  "ヤツらは、我がウェスタリスへの戦争を企てている。なんとしても、その計画を突き止めねば…。",
  "彼に任せよう。うちで最も腕の立つエージェント…黄昏。",
  "約束の物だ。",
  "外務大臣がヅラだという証拠写真。ネガもある。",
  "よくやった。",
  "これでヤツを辞任に追い込める。次も、頼んだぞ。",
  "おい。",
  "あっ…。",
];

const tempData = {
  id: "chatcmpl-6x4l1qHaA4lB4qM4snzrpv5eCo1mE",
  object: "chat.completion",
  created: 1679537659,
  model: "gpt-3.5-turbo-0301",
  usage: { prompt_tokens: 140, completion_tokens: 17, total_tokens: 157 },
  choices: [
    {
      message: {
        role: "assistant",
        content: "なんかうまいこと使ってやれないの？",
      },
      finish_reason: "stop",
      index: 0,
    },
  ],
};

export default function Home() {
  const [refLines, setRefLines] = useState([]);
  const { chat, setChat, ref: scrollRef } = useChat(refLines);
  const options = useOptions(refLines, chat, setChat);
  const { data, error, isLoading } = useAssistant(chat);
  console.log(error);

  useEffect(() => {
    if (data) {
      const newChat = {
        content: data.content,
        role: data.role,
        type: chat[chat.length - 1],
        raw: data,
      };
      setChat([...chat, newChat]);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Head>
        <title>Japanese Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={s.main}>
        <div className={s.wrapper}>
          <LineContext.Provider value={{ refLines, setRefLines }}>
            <div className={s.textWrapper}>
              <div className={s.textLines}>
                {lines.map((line, ind) => (
                  <TextLine text={line} key={ind} />
                ))}
              </div>
            </div>
            <div className={s.chatWrapper}>
              {/* <ChatBubble message={chat} />
              <ChatBubble
                message={{
                  role: "user",
                  content: `Lines: ${refLines.length} ${refLines.at(-1)}`,
                }}
              /> */}
              <div className={s.chatBubbles} ref={scrollRef}>
                {chat.map((message, ind) => {
                  return (
                    <ChatBubble key={ind} message={message} options={options} />
                  );
                })}
                {isLoading && <ChatLoadingBubble />}
              </div>
              <ChatInput chat={chat} setChat={setChat} />
            </div>
          </LineContext.Provider>
        </div>
      </main>
    </>
  );
}
