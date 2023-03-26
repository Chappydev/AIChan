import React, { useEffect } from "react";
import AccordionChip from "../AccordionChip";
import Chip from "../Chip";
import s from "./ChatBubble.module.scss";

const ChatBubble = ({ message }) => {
  useEffect(() => {
    console.log(message);
  });

  return (
    // Outer div should span full width of container
    <div className={s.wrapper}>
      {/* Inner divs are the actual chat bubble and any chips underneath */}
      <div className={s.innerWrapper}>
        <div className={s.messageBubble} data-role={message.role}>
          {message.content}
        </div>
        {message.role === "assistant" && (
          <div className={s.chips}>
            <Chip>Test</Chip>
            <AccordionChip
              options={["Translate", "Expand", "Dialect", "Particles"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
