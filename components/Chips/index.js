import React from "react";
import s from "./Chips.module.scss";
import AccordionChip from "../AccordionChip";
import Chip from "../Chip";
import useChips from "@/hooks/useChips";

const Chips = ({ initial = false, options }) => {
  const [visibleOptions, hiddenOptions, containerRef] = useChips(options);

  return (
    <div id={initial ? "initChips" : ""} className={s.chips} ref={containerRef}>
      {visibleOptions.map((option, ind) => (
        <Chip key={ind} onClick={option.handler}>
          {option.name}
        </Chip>
      ))}
      {hiddenOptions.length >= 1 && <AccordionChip options={hiddenOptions} />}
    </div>
  );
};

export default Chips;
