import React, { useState } from "react";
import s from "./AccordionChip.module.scss";
import Chip from "../Chip";
import AccordionOption from "./AccordionOption";

const AccordionChip = ({ options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Chip onClick={toggleDropdown}>
        ...
        <div className={s.dropdown} data-open={isOpen}>
          {options.map((option, ind) => {
            return <AccordionOption key={ind} option={option} />;
          })}
        </div>
      </Chip>
    </>
  );
};

export default AccordionChip;
