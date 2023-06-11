import React from 'react';
import s from './SubtitlePlayer.module.scss';

const SubtitlePlayer = ({ subtitles }) => {
  return (
    <div className={s.wrapper}>
      {subtitles.map((sub, i) => {
        return <div key={i} className={s.subtitleLine}>{sub.text}</div>
      })}
    </div>
  )
}

export default SubtitlePlayer;
