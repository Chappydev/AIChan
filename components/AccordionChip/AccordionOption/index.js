import React from "react";
import s from "./AccordionOption.module.scss";

const AccordionOption = ({ option }) => {
  return <div className={s.wrapper}>{option}</div>;
};

export default AccordionOption;
