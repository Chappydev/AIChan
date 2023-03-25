import React, { useState } from "react";
import s from "./ChatInput.module.scss";

const ChatInput = ({ chat, setChat }) => {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = {
      role: "user",
      content: text,
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
