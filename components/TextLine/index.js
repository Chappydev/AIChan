import React, { useState } from "react";
import s from "./TextLine.module.scss";

const TextLine = ({ text }) => {
  const [refSelected, setRefSelected] = useState(false);

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
