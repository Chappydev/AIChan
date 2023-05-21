import React, { useEffect, useRef, useState } from "react";
import s from './Video.module.scss';
import VideoPlayer from "@/components/VideoPlayer";
import FileUploadForm from "@/components/FileUploadForm";
import Head from "next/head";
import SubtitleReader from "@/utility/SubtitleReader";

const Video = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  console.log(videoSrc, subtitles);
  const videoTagRef = useRef();


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
        return {
          file: previous.file,
          fileUrl: previous.fileUrl
        }
      }

    })
    setSubtitles(subtitleFiles);

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
        <div>
        </div>
      </div>
    </>
  )
}

export default Video;
