import React from "react";
import s from "./Chips.module.scss";
import AccordionChip from "../AccordionChip";
import Chip from "../Chip";

const Chips = ({ options }) => {
  // replace this with some logic to determine how much space there is
  const numberOfChips = 3;
  const visibleOptions = options.slice(0, numberOfChips - 1);
  const hiddenOptions = options.slice(numberOfChips - 1);

  return (
    <div className={s.chips}>
      {visibleOptions.map((option, ind) => (
        <Chip key={ind} onClick={option.handler}>
          {option.name}
        </Chip>
      ))}
      <AccordionChip options={hiddenOptions} />
    </div>
  );
};

export default Chips;
