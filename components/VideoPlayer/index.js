import React from "react";
import s from './VideoPlayer.module.scss';
import Play from "../material-icons/Play";
import Pause from "../material-icons/Pause";
import useVideo from "@/hooks/useVideo";

const VideoPlayer = ({ src, videoTagRef }) => {
  const { isPlay, togglePlay, videoRef } = useVideo();

  return (
    <div className={s.videoContainer}>
      <video className={s.video} ref={(el) => { videoTagRef.current = el; videoRef.current = el; }} src={src}>
      </video>
      {/* controls */}
      <div className={s.controls}>
        <button className={s.playPauseBtn} onClick={togglePlay}>{isPlay ? <Pause /> : <Play />}</button>
      </div>
    </div>
  )
}

export default VideoPlayer;
