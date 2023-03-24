import Head from "next/head";
import s from "@/styles/Home.module.scss";
import { useContext, useEffect, useState } from "react";
import TextLine from "@/components/TextLine";
import ChatBubble from "@/components/ChatBubble";
import { LineContext } from "@/contexts/LineContext";

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

const initialMessage = {
  role: "assistant",
  content:
    "I'm your Japanese learning assistant. How can I help you? Select a premade option or type your question/prompt",
  // 'raw' is the unaltered message data (for sending to api)
  // null indicates that this message should not be included in requests
  raw: null,
};

export default function Home() {
  const [refLines, setRefLines] = useState([]);
  const [chat, setChat] = useState([initialMessage]);
  console.log(chat, typeof chat);

  useEffect(() => {
    (async () => {
      try {
        // const response = await fetch("api/assistant");
        // const data = await response.json();
        // setChat(data.choices[0].message);
        // -----
        // setChat(tempData.choices[0].message);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Japanese Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={s.main}>
        <div className={s.wrapper}>
          <LineContext.Provider value={{ refLines, setRefLines }}>
            <div>
              {lines.map((line, ind) => (
                <TextLine text={line} key={ind} />
              ))}
            </div>
            <div>
              {/* <ChatBubble message={chat} />
              <ChatBubble
                message={{
                  role: "user",
                  content: `Lines: ${refLines.length} ${refLines.at(-1)}`,
                }}
              /> */}
              {chat.map((message, ind) => {
                console.log(message);
                return <ChatBubble key={ind} message={message} />;
              })}
            </div>
          </LineContext.Provider>
        </div>
      </main>
    </>
  );
}
