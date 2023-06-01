import { LineContext } from "@/contexts/LineContext";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import s from "./TextLine.module.scss";

const TextLine = forwardRef(({ id, text }, ref) => {
  const { refLines, setRefLines } = useContext(LineContext);
  const [refSelected, setRefSelected] = useState(false);

  useEffect(() => {
    if (refSelected) {
      setRefLines([...refLines, text]);
    } else {
      setRefLines(refLines.filter((line) => line !== text));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- adding refLines causes an infinite loop
  }, [refSelected, text, setRefLines]);

  // Ensure refSelected is up to date with any external changes to refLines
  // eg. Starting a tour resets the refLines
  useEffect(() => {
    if (refSelected && !refLines.some((line) => line === text)) {
      setRefSelected(false);
    } else if (!refSelected && refLines.some((line) => line === text)) {
      setRefSelected(true);
    }
    // eslint-disable-next-line
  }, [refLines, text, setRefSelected]);

  return (
    <div ref={ref}>
      <span
        id={id}
        className={s.refSelector}
        data-selected={refSelected}
        onClick={() => setRefSelected(!refSelected)}
      >
        •
      </span>
      <span>{text}</span>
    </div>
  );
});

export default TextLine;
