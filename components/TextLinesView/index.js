import React from 'react';
import s from './TextLinesView.module.scss';
import TextLine from '../TextLine';

const TextLinesView = ({ lines, currentLines }) => {
  return (
    <div id="textArea" className={s.textWrapper}>
      <div className={s.textLines}>
        {lines.map((line, ind) => <TextLine text={line.text} key={ind} />)}
      </div>
    </div>
  )
}

export default TextLinesView;
