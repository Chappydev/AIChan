import { LineContext } from "@/contexts/LineContext";
import React, { useContext, useEffect } from "react";
import AccordionChip from "../AccordionChip";
import Chip from "../Chip";
import Chips from "../Chips";
import s from "./ChatBubble.module.scss";

const ChatBubble = ({ role, options = null, children }) => {
  return (
    // Outer div should span full width of container
    <div className={s.wrapper}>
      {/* Inner divs are the actual chat bubble and any chips underneath */}
      <div className={s.innerWrapper}>
        <div className={s.messageBubble} data-role={role}>
          {children}
        </div>
        {role === "assistant" && options && <Chips options={options} />}
      </div>
    </div>
  );
};

export default ChatBubble;
