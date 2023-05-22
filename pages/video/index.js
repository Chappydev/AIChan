import React, { useEffect, useMemo, useRef, useState } from "react";
import s from './Video.module.scss';
import VideoPlayer from "@/components/VideoPlayer";
import FileUploadForm from "@/components/FileUploadForm";
import Head from "next/head";
import SubtitleReader from "@/utility/SubtitleReader";
import TextLinesView from "@/components/TextLinesView";
import { LineContext } from "@/contexts/LineContext";
import useChat from "@/hooks/useChat";
import ChatBubble from "@/components/ChatBubble";
import TextArea from "@/components/TextArea";
import ChatLoadingBubble from "@/components/ChatLoadingBubble";
import ChatInput from "@/components/ChatInput";
import useOptions from "@/hooks/useOptions";
import useAssistant from "@/hooks/useAssistant";

const Video = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [subtitleFiles, setSubtitleFiles] = useState([]);
  console.log(videoSrc, subtitleFiles);
  const [subtitles, setSubtitles] = useState([]);
  console.log(subtitles);
  const [refLines, setRefLines] = useState([]);
  const videoTagRef = useRef();
  const { chat, setChat, ref: scrollRef, onComplete } = useChat(refLines);
  const options = useOptions(refLines, chat, setChat);
  const { data, error, isLoading } = useAssistant(chat);

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

  const subtitleReader = useMemo(() => {
    return new SubtitleReader();
  }, [SubtitleReader]);

  useEffect(() => {
    (async () => {
      setSubtitles(await subtitleReader.subtitles(subtitleFiles));
    })()
  }, [subtitleFiles, subtitleReader, setSubtitles])


  const handleSources = (sources) => {
    const { subtitleFiles, videoFile } = sources

    setVideoSrc((previous) => {
      if (videoFile) {
        // TODO: add function to remove/revoke the old videoFile

        const videoFileUrl = URL.createObjectURL(videoFile);

        return {
          file: videoFile,
          fileUrl: videoFileUrl
        }
      } else {
        return previous;
      }

    })
    setSubtitleFiles(subtitleFiles);

    if (videoTagRef?.current) {
      videoTagRef.current.load();
    }
  }


  return (
    <>
      <Head>
        <title>AIChan - VideoPlayer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={s.outerWrapper}>
        <FileUploadForm handleSources={handleSources} />
        <VideoPlayer src={videoSrc?.fileUrl} subtitles={subtitles} videoTagRef={videoTagRef} />
        {/* chat */}
        <div className={s.textAndChatWrapper}>
          <LineContext.Provider value={{ refLines, setRefLines }}>
            <TextLinesView lines={subtitles.map(s => s.text)} />
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
      </div>
    </>
  )
}

export default Video;
