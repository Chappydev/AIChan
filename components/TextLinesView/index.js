import React from 'react';
import s from './TextLinesView.module.scss';
import TextLine from '../TextLine';

const TextLinesView = ({ lines }) => {
  return (
    <div id="textArea" className={s.textWrapper}>
      <div className={s.textLines}>
        {lines.map((line, ind) =>
          line.startsWith("オスタニア") ? (
            <TextLine id="lineSelector" text={line} key={ind} />
          ) : (
            <TextLine text={line} key={ind} />
          )
        )}
      </div>
    </div>
  )
}

export default TextLinesView;
