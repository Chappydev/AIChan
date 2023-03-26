import { LineContext } from "@/contexts/LineContext";
import React, { useContext, useState } from "react";
import s from "./ChatInput.module.scss";

const ChatInput = ({ chat, setChat }) => {
  const { refLines } = useContext(LineContext);
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = {
      role: "user",
      content: text.replace("{lines}", refLines.join("\n")),
      type: "custom",
      raw: {
        role: "user",
        content: text,
      },
    };
    setChat([...chat, newMsg]);
    setText("");
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit}>
      <input
        className={s.textInput}
        type="text"
        onChange={handleOnChange}
        value={text}
      />
      <button className={s.submit} type="submit">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
