import React, { useEffect, useState } from "react";
import ChatBubble from "../ChatBubble";

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

  return <ChatBubble role="assistant">{text}</ChatBubble>;
};

export default ChatLoadingBubble;
