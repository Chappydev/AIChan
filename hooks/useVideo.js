import { useEffect, useRef, useState } from "react"

const useVideo = () => {
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef(null);

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
      videoRef.current.removeEventListener('play', playHandler);
      videoRef.current.removeEventListener('pause', pauseHandler);
    }
  }, [videoRef?.current])

  useEffect(() => {
    const keydownHandler = (e) => {
      console.log(e);
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          togglePlay();
          break;
      }
    }

    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, []);

  return { isPlay, togglePlay, videoRef };
}

export default useVideo;
