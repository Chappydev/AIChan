import React, { useEffect, useState } from "react";
import s from "./ChatLoadingBubble.module.scss";

const ChatLoadingBubble = () => {
  const [text, setText] = useState("...");
  useEffect(() => {
    const interval = setInterval(() => {
      setText(text.length >= 3 ? "." : text.concat("."));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={s.wrapper}>
      {/* Inner divs are the actual chat bubble and any chips underneath */}
      <div className={s.innerWrapper}>
        <div className={s.messageBubble}>{text}</div>
      </div>
    </div>
  );
};

export default ChatLoadingBubble;
