import React from "react";
import s from './VideoPlayer.module.scss';
import Play from "../material-icons/Play";
import Pause from "../material-icons/Pause";
import useVideo from "@/hooks/useVideo";
import FullscreenExit from "../material-icons/FullscreenExit";
import Fullscreen from "../material-icons/Fullscreen";

const VideoPlayer = ({ src, videoTagRef }) => {
  const { isPlay, isFullscreen, togglePlay, toggleFullScreenMode, videoRef, videoContainerRef } = useVideo();

  return (
    <div className={s.videoContainer} ref={videoContainerRef}>
      <video className={s.video} ref={(el) => { videoTagRef.current = el; videoRef.current = el; }} src={src}>
      </video>
      {/* controls */}
      <div className={s.controls}>
        <button className={s.playPauseBtn} onClick={togglePlay}>{isPlay ? <Pause /> : <Play />}</button>
        <button className={s.fullscreenBtn} onClick={toggleFullScreenMode}>{isFullscreen ? <FullscreenExit /> : <Fullscreen />}</button>
      </div>
    </div>
  )
}

export default VideoPlayer;
