import Head from "next/head";
import s from "@/styles/Home.module.scss";
import { useEffect, useReducer, useState } from "react";
import TextLine from "@/components/TextLine";
import ChatBubble from "@/components/ChatBubble";
import { LineContext } from "@/contexts/LineContext";
import ChatInput from "@/components/ChatInput";
import useAssistant from "@/hooks/useAssistant";
import useOptions from "@/hooks/useOptions";
import useChat from "@/hooks/useChat";
import ChatLoadingBubble from "@/components/ChatLoadingBubble";
import TextArea from "@/components/TextArea";
import dynamic from "next/dynamic";
import { INITIAL_STATE, reducer } from "@/utility/tourConfig";
import TextAreaInput from "@/components/TextAreaInput";
import HeaderLayout from "@/components/HeaderLayout";
const Tour = dynamic(() => import("../components/Tour"), { ssr: false });

export default function Home() {
  const [lines, setLines] = useState([
    "お前、誰？",
    "最近何してんの？",
    "オスタニアにおいて、我が国の外交官が事故死した。だが当局は、東の極右政党による、暗殺と見ている。",
    "ヤツらは、我がウェスタリスへの戦争を企てている。なんとしても、その計画を突き止めねば…。",
    "彼に任せよう。うちで最も腕の立つエージェント…黄昏。",
    "約束の物だ。",
    "外務大臣がヅラだという証拠写真。ネガもある。",
    "よくやった。",
    "これでヤツを辞任に追い込める。次も、頼んだぞ。",
  ]);
  const [refLines, setRefLines] = useState([]);
  const { chat, setChat, ref: scrollRef, onComplete } = useChat(refLines);
  const options = useOptions(refLines, chat, setChat);
  const { data, error, isLoading } = useAssistant(chat, setChat);
  console.log(error);
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (
      refLines.length === 1 &&
      refLines[0].startsWith("オスタニア") &&
      tourState.stepIndex === 3
    ) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { ...tourState, stepIndex: 4 },
      });
    }
    // eslint-disable-next-line
  }, [refLines]);

  const handleStartTour = () => {
    setRefLines([]);
    localStorage.removeItem("tour");
    dispatch({ type: "RESTART" });
  };

  return (
    <>
      <Head>
        <title>AIChan - Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Tour
        tourState={tourState}
        dispatch={dispatch}
        refLines={refLines}
        setRefLines={setRefLines}
      />
      <HeaderLayout
        navItems={
          <button className={s.tourStartButton} onClick={handleStartTour}>
            Take a Tour
          </button>
        }
      >
        <main className={s.main}>
          <div className={s.wrapper}>
            <LineContext.Provider value={{ refLines, setRefLines }}>
              <div id="textArea" className={s.textWrapper}>
                <div className={s.textLines}>
                  {lines.map((line, ind) =>
                    line.startsWith("オスタニア") ? (
                      <TextLine id="lineSelector" text={line} key={ind} />
                    ) : (
                      <TextLine text={line} key={ind} />
                    )
                  )}
                </div>
                <TextAreaInput lines={lines} setLines={setLines} />
              </div>
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
                      <ChatBubble
                        key={ind}
                        role={message.role}
                        options={options}
                      >
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
        </main>
      </HeaderLayout>
    </>
  );
}
