import React, { useEffect, useRef, useState } from "react";
import s from './Video.module.scss';
import VideoPlayer from "@/components/VideoPlayer";
import FileUploadForm from "@/components/VideoUploadForm";
import Head from "next/head";

const Video = () => {
  const [src, setSrc] = useState(null);
  console.log(src);
  const videoTagRef = useRef();
  const handleFileUpload = (dataUrl) => {
    setSrc(dataUrl);
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
        <FileUploadForm onFileUpload={handleFileUpload} />
        <VideoPlayer src={src} videoTagRef={videoTagRef} />
        {/* chat */}
        <div>
        </div>
      </div>
    </>
  )
}

export default Video;
