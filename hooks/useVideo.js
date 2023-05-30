import Clock from "@/utility/Clock";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const useVideo = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(undefined);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoClock = useMemo(() => {
    if (duration * 1000) {
      return new Clock(videoRef.current.duration);
    }

    return null;
  }, [duration]);

  const togglePlay = async () => {
    if (!videoRef?.current) {
      return;
    }

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();

      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await videoRef.current.pause();

        setIsPlay(!isPlay);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const toggleFullScreenMode = async () => {
    if (document.fullscreenElement == null && videoContainerRef.current) {
      try {
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        } else if (videoContainerRef.current.webkitRequestFullscreen) { /* Safari */
          await videoContainerRef.current.webkitRequestFullscreen();
        } else if (videoContainerRef.current.msRequestFullscreen) { /* IE11 */
          await videoContainerRef.current.msRequestFullscreen();
        }

        setIsFullscreen(true);
      } catch (error) {
        console.error(err);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  const skipBackwardFive = useCallback(() => {
    if (!videoRef.current.src) {
      return;
    }

    let newTime;

    if (videoRef.current.currentTime <= 5) {
      newTime = 0;
    } else {
      newTime = videoRef.current.currentTime - 5;
    }
    videoRef.current.currentTime = newTime;
    videoClock.setTime(newTime * 1000);
  }, [videoClock]);

  const skipForwardFive = useCallback(() => {
    if (!videoRef.current.src) {
      return;
    }

    let newTime;

    if (videoRef.current.currentTime >= videoRef.current.duration - 5) {
      newTime = videoRef.current.duration;
    } else {
      newTime = videoRef.current.currentTime + 5
    }
    videoRef.current.currentTime = newTime;
    videoClock.setTime(newTime * 1000);
  }, [videoClock]);

  const playHandler = useCallback(() => {
    setIsPlay(true);
    if (videoClock) {
      videoClock.start();
    }
  }, [videoClock]);

  const pauseHandler = useCallback(() => {
    setIsPlay(false);
    if (videoClock) {
      videoClock.pause();
    }
  }, [videoClock]);

  const durationChangeHandler = () => {
    setDuration(videoRef?.current?.duration);
  };

  useEffect(() => {
    if (videoRef?.current) {

      videoRef.current.addEventListener('play', playHandler)

      videoRef.current.addEventListener('pause', pauseHandler)

      videoRef.current.addEventListener('durationchange', durationChangeHandler);
    }

    return () => {
      videoRef?.current?.removeEventListener('play', playHandler);
      videoRef?.current?.removeEventListener('pause', pauseHandler);
      videoRef?.current?.removeEventListener('durationchange', durationChangeHandler);
    };
  }, [videoRef?.current, playHandler, pauseHandler])

  useEffect(() => {
    const fullscreenHandler = () => {
      if (document.fullscreenElement === videoContainerRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    }

    document.addEventListener('fullscreenchange', fullscreenHandler);

    return () => document.removeEventListener('fullscreenchange', fullscreenHandler);
  }, [videoContainerRef?.current])

  useEffect(() => {
    const keydownHandler = (e) => {
      const isTypableInput = e.target.tagName === 'INPUT' && ['text', 'email', 'password', 'search', 'tel'].includes(e.target.type);
      const isContentEditableElem = e.target.isContentEditable;
      const isTextArea = e.target.tagName === 'TEXTAREA';
      if (isContentEditableElem || isTypableInput || isTextArea) return;
      if (e.shiftKey || e.ctrlKey || e.metaKey) return;
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          togglePlay();
          break;
        case 'f':
          toggleFullScreenMode();
          break;
        case 'l':
          skipForwardFive();
          break;
        case 'j':
          skipBackwardFive();
          break;
      }
    }

    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, [togglePlay, toggleFullScreenMode, skipForwardFive, skipBackwardFive]);

  return { videoClock, isPlay, isFullscreen, togglePlay, toggleFullScreenMode, skipForwardFive, videoRef, videoContainerRef };
}

export default useVideo;
