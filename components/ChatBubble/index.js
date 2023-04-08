import React from "react";
import Chips from "../Chips";
import s from "./ChatBubble.module.scss";

const ChatBubble = ({
  role,
  options = null,
  initial = false,
  error = false,
  children,
}) => {
  return (
    // Outer div should span full width of container
    <div className={s.wrapper}>
      {/* Inner divs are the actual chat bubble and any chips underneath */}
      <div id={initial ? "initMessage" : ""} className={s.innerWrapper}>
        <div
          className={`${s.messageBubble} ${error ? s.error : ""}`}
          data-role={role}
        >
          {children}
        </div>
        {role === "assistant" && options && (
          <Chips initial={initial} options={options} />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
