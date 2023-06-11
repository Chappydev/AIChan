import React, { useEffect, useRef } from 'react';
import s from './TextLinesView.module.scss';
import TextLine from '../TextLine';

const desiredTopOffset = 75;
const maxBottomOffset = 150;

const TextLinesView = ({ lines, currentLines }) => {
  const currentLineRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const offsetFromTop = currentLineRef?.current?.offsetTop - scrollContainerRef.current.scrollTop;
    if (offsetFromTop >= scrollContainerRef?.current?.clientHeight - maxBottomOffset) {
      scrollContainerRef.current.scrollTop += offsetFromTop - desiredTopOffset;
    }
  }, [currentLines])

  return (
    <div className={s.textWrapper} style={{ position: 'relative' }}>
      <div className={s.textLines} ref={scrollContainerRef}>
        {lines.map((line, ind) => line.start === currentLines[0]?.start ? <TextLine text={line.text} key={ind} ref={currentLineRef} /> : <TextLine text={line.text} key={ind} />)}
      </div>
    </div>
  )
}

export default TextLinesView;
