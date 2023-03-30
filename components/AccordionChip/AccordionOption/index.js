import React from "react";
import s from "./AccordionOption.module.scss";

const AccordionOption = ({ option }) => {
  return (
    <div className={s.wrapper} onClick={option.handler}>
      {option.name}
    </div>
  );
};

export default AccordionOption;
