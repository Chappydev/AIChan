import { useEffect, useRef, useState } from "react"

const useVideo = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

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

  const skipBackwardFive = () => {
    if (!videoRef.current.src) {
      return;
    }

    if (videoRef.current.currentTime <= 5) {
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.currentTime = videoRef.current.currentTime - 5;
    }
  }

  const skipForwardFive = () => {
    if (!videoRef.current.src) {
      return;
    }

    if (videoRef.current.currentTime >= videoRef.current.duration - 5) {
      videoRef.current.currentTime = videoRef.current.duration;
    } else {
      videoRef.current.currentTime = videoRef.current.currentTime + 5;
    }
  }

  useEffect(() => {
    const playHandler = () => {
      setIsPlay(true);
    };

    const pauseHandler = () => {
      setIsPlay(false);
    };
    if (videoRef?.current) {

      videoRef.current.addEventListener('play', playHandler)

      videoRef.current.addEventListener('pause', pauseHandler)
    }

    return () => {
      videoRef?.current?.removeEventListener('play', playHandler);
      videoRef?.current?.removeEventListener('pause', pauseHandler);
    };
  }, [videoRef?.current])

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
      console.log(e);
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
  }, []);

  return { isPlay, isFullscreen, togglePlay, toggleFullScreenMode, skipForwardFive, videoRef, videoContainerRef };
}

export default useVideo;
