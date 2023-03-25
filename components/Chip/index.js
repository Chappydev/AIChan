import React from "react";
import s from "./Chip.module.scss";

const Chip = ({ onClick = function () {}, children }) => {
  return (
    <div className={s.wrapper} onClick={onClick}>
      {children}
    </div>
  );
};

export default Chip;
