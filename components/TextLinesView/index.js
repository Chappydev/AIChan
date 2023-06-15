import { scrollend } from "scrollyfills";
import React, { useEffect, useRef, useState } from 'react';
import s from './TextLinesView.module.scss';
import TextLine from '../TextLine';
import { VerticalAlignCenterRounded } from "@mui/icons-material";

const desiredTopOffset = 75;
const maxBottomOffset = 150;

const TextLinesView = ({ lines, currentLines }) => {
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const ignoreNextScrollEvent = useRef(false);
  const currentLineRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // TODO: stop autoscroll when user chooses to scroll on their own
  // and include a way to get back to autoscroll
  // TODO: Maintain scroll position when switching between this and chat
  // TODO: Add option to clear all refLines/maybe only allow one a time and clear old selection when you pick new one
  useEffect(() => {
    if (!isAutoscroll) return;

    const offsetFromTop = currentLineRef?.current?.offsetTop - scrollContainerRef.current.scrollTop;
    if (offsetFromTop >= scrollContainerRef?.current?.clientHeight - maxBottomOffset) {
      const scrollDistance = offsetFromTop - desiredTopOffset;
      ignoreNextScrollEvent.current = true;
      scrollContainerRef.current.scrollBy({ top: scrollDistance });
    }
  }, [currentLines])

  useEffect(() => {
    if (!scrollContainerRef?.current) return;
    const scrollContainer = scrollContainerRef.current;

    const scrollEndHandler = () => {
      console.log('scrollend');
      if (ignoreNextScrollEvent.current) {
        ignoreNextScrollEvent.current = false;
        return;
      }
    }

    scrollContainer.addEventListener('scrollend', scrollEndHandler);

    return () => scrollContainer.removeEventListener('scrollend', scrollEndHandler);
  }, [])

  const scrollHandler = () => {
    if (!ignoreNextScrollEvent.current) {
      setIsAutoscroll(false);
      return;
    }
  }

  const bubbleClickHandler = () => {
    // scroll current line into view
    const offsetFromTop = currentLineRef?.current?.offsetTop - scrollContainerRef.current.scrollTop;
    if (offsetFromTop >= scrollContainerRef?.current?.clientHeight - maxBottomOffset || offsetFromTop < desiredTopOffset) {
      const scrollDistance = offsetFromTop - desiredTopOffset;
      ignoreNextScrollEvent.current = true;
      scrollContainerRef.current.scrollBy({ top: scrollDistance });
    }

    setIsAutoscroll(true);
  }

  return (
    <div className={s.textWrapper} style={{ position: 'relative' }}>
      {!isAutoscroll && (
        <button className={s.bubble} onClick={bubbleClickHandler}>
          <VerticalAlignCenterRounded fontSize="medium" />
        </button>
      )}
      <div className={s.textLines} ref={scrollContainerRef} onScroll={scrollHandler}>
        {lines.map((line, ind) => line.start === currentLines[0]?.start ? <TextLine text={line.text} key={ind} ref={currentLineRef} /> : <TextLine text={line.text} key={ind} />)}
      </div>
    </div>
  )
}

export default TextLinesView;
