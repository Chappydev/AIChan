import { LineContext } from "@/contexts/LineContext";
import React, { useContext, useEffect, useState } from "react";
import s from "./TextLine.module.scss";

const TextLine = ({ text }) => {
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

  return (
    <div>
      <span
        className={s.refSelector}
        data-selected={refSelected}
        onClick={() => setRefSelected(!refSelected)}
      >
        •
      </span>
      <span>{text}</span>
    </div>
  );
};

export default TextLine;
