import React, { useState } from "react";
import s from "./TextAreaInput.module.scss";

const TextAreaInput = ({ lines, setLines }) => {
  const [text, setText] = useState("");
  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLines([...lines, text]);
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
        Add
      </button>
    </form>
  );
};

export default TextAreaInput;
