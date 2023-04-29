import React from "react";
import s from './VideoPlayer.module.scss';

const VideoPlayer = ({ src, videoTagRef }) => {
  return (
    <div>
      <video className={s.video} controls ref={videoTagRef}>
        <source src={src} type="video/mp4" />
      </video>
      {/* controls */}
      <div>
      </div>
    </div>
  )
}

export default VideoPlayer;
