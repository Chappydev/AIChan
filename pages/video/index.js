import React, { useEffect, useMemo, useRef, useState } from "react";
import s from './Video.module.scss';
import VideoPlayer from "@/components/VideoPlayer";
import FileUploadForm from "@/components/FileUploadForm";
import Head from "next/head";
import SubtitleReader from "@/utility/SubtitleReader";
import { LinesAssistant } from "@/components/LinesAssistant";

const Video = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [subtitleFiles, setSubtitleFiles] = useState([]);
  console.log(videoSrc, subtitleFiles);
  const [subtitles, setSubtitles] = useState([]);
  console.log(subtitles);
  const [showAssistant, setShowAssistant] = useState(false);
  const videoTagRef = useRef();

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

  const toggleSidebar = () => setShowAssistant(!showAssistant);


  return (
    <>
      <Head>
        <title>AIChan - VideoPlayer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={s.outerWrapper}>
        <FileUploadForm handleSources={handleSources} />
        <div className={s.mainSection}>
          <VideoPlayer src={videoSrc?.fileUrl} subtitles={subtitles} videoTagRef={videoTagRef} toggleSidebar={toggleSidebar} sidebarShown={showAssistant} />
          <LinesAssistant lines={subtitles.map(s => s.text)} shown={showAssistant} />
        </div>
      </div>
    </>
  )
}

export default Video;
