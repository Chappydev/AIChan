import React, { useEffect, useMemo, useState } from "react";
import s from './VideoPlayer.module.scss';
import useVideo from "@/hooks/useVideo";
import { Forward5Rounded, FullscreenExitRounded, FullscreenRounded, PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import SubtitlePlayer from "../SubtitlePlayer";
import SubtitleManager from "@/utility/SubtitleManager";

const VideoPlayer = ({ src, subtitles, onTimeUpdate, videoTagRef }) => {
  const { isPlay, isFullscreen, togglePlay, toggleFullScreenMode, skipForwardFive, videoRef, videoContainerRef } = useVideo();

  const [currentSubtitles, setCurrentSubtitles] = useState([]);
  const subtitleManager = useMemo(() => new SubtitleManager(subtitles), [subtitles, SubtitleManager]);

  // TODO: Refactor time to be more precise. In it's current state, the subtitle is only accurate to the second which kinda sucks
  useEffect(() => {
    let interval;

    if (videoRef?.current?.currentTime) {
      interval = setInterval(() => {
        const subtitlesAtTime = subtitleManager.findSubtitleAt(Math.floor(videoRef?.current.currentTime) * 1000);
        setCurrentSubtitles(subtitlesAtTime);
      }, 100)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [subtitleManager, setCurrentSubtitles, videoRef?.current])

  return (
    <div className={s.videoContainer} ref={videoContainerRef}>
      <video className={s.video} ref={(el) => { videoTagRef.current = el; videoRef.current = el; }} src={src} onTimeUpdate={onTimeUpdate}>
      </video>
      {/* controls */}
      <SubtitlePlayer subtitles={currentSubtitles} />
      <div className={s.controls
      } >
        <button className={s.playPauseBtn} onClick={togglePlay}>{isPlay ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}</button>
        <button className={s.forwardFiveBtn} onClick={skipForwardFive}>{isPlay ? <Forward5Rounded fontSize="large" /> : <Forward5Rounded fontSize="large" />}</button>
        <button className={s.fullscreenBtn} onClick={toggleFullScreenMode}>{isFullscreen ? <FullscreenExitRounded fontSize="large" /> : <FullscreenRounded fontSize="large" />}</button>
      </div>
    </div >
  )
}

export default VideoPlayer;
