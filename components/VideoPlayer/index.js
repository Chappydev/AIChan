import React from "react";
import s from './VideoPlayer.module.scss';
import useVideo from "@/hooks/useVideo";
import { FullscreenExitRounded, FullscreenRounded, PauseRounded, PlayArrowRounded } from "@mui/icons-material";

const VideoPlayer = ({ src, videoTagRef }) => {
  const { isPlay, isFullscreen, togglePlay, toggleFullScreenMode, videoRef, videoContainerRef } = useVideo();

  return (
    <div className={s.videoContainer} ref={videoContainerRef}>
      <video className={s.video} ref={(el) => { videoTagRef.current = el; videoRef.current = el; }} src={src}>
      </video>
      {/* controls */}
      <div className={s.controls}>
        <button className={s.playPauseBtn} onClick={togglePlay}>{isPlay ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}</button>
        <button className={s.fullscreenBtn} onClick={toggleFullScreenMode}>{isFullscreen ? <FullscreenExitRounded fontSize="large" /> : <FullscreenRounded fontSize="large" />}</button>
      </div>
    </div>
  )
}

export default VideoPlayer;
