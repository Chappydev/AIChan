import React, { useEffect, useMemo, useState } from "react";
import s from './VideoPlayer.module.scss';
import useVideo from "@/hooks/useVideo";
import { Forward5Rounded, FullscreenExitRounded, FullscreenRounded, PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import SubtitlePlayer from "../SubtitlePlayer";
import SubtitleManager from "@/utility/SubtitleManager";
import { getReadableTime } from "@/utility/videoFunctions";

const VideoPlayer = ({ src, subtitles, videoTagRef }) => {
  const { videoClock, isPlay, isFullscreen, togglePlay, toggleFullScreenMode, skipForwardFive, videoRef, videoContainerRef } = useVideo();

  const [currentSubtitles, setCurrentSubtitles] = useState([]);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [videoLength, setVideoLength] = useState('00:00');
  const subtitleManager = useMemo(() => new SubtitleManager(subtitles), [subtitles, SubtitleManager]);

  const timeUpdateHandler = (e) => {
    setCurrentTime(getReadableTime(e.target.currentTime));
  }

  const durationChangeHandler = (e) => {
    if (!e.target.duration) {
      setVideoLength('00:00');
    }
    setVideoLength(getReadableTime(e.target.duration));
  }

  useEffect(() => {
    let interval;

    if (videoClock) {
      interval = setInterval(() => {
        const subtitlesAtTime = subtitleManager.findSubtitleAt(videoClock.getTime());
        setCurrentSubtitles(subtitlesAtTime);
      }, 100)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [subtitleManager, setCurrentSubtitles, videoClock])

  return (
    <div className={s.videoContainer} ref={videoContainerRef}>
      <video className={s.video} ref={(el) => { videoTagRef.current = el; videoRef.current = el; }} src={src} onTimeUpdate={timeUpdateHandler} onDurationChange={durationChangeHandler}>
      </video>
      {/* controls */}
      <SubtitlePlayer subtitles={currentSubtitles} />
      <div className={s.controls
      } >
        <div className={s.timeControls}>
          <div>{currentTime}</div>
          <div>{videoLength}</div>
        </div>
        <div className={s.buttonControls}>
          <button className={s.playPauseBtn} onClick={togglePlay}>{isPlay ? <PauseRounded fontSize="large" /> : <PlayArrowRounded fontSize="large" />}</button>
          <button className={s.forwardFiveBtn} onClick={skipForwardFive}>{isPlay ? <Forward5Rounded fontSize="large" /> : <Forward5Rounded fontSize="large" />}</button>
          <button className={s.fullscreenBtn} onClick={toggleFullScreenMode}>{isFullscreen ? <FullscreenExitRounded fontSize="large" /> : <FullscreenRounded fontSize="large" />}</button>
        </div>
      </div>
    </div >
  )
}

export default VideoPlayer;
