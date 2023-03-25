import React from "react";
import s from "./Chip.module.scss";

const Chip = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default Chip;
