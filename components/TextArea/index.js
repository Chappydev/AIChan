import React, { useEffect, useRef, useState } from "react";

const TextArea = ({ content = "", onComplete }) => {
  const [value, setValue] = useState();
  const textbox = useRef();
  useEffect(() => {
    if (textbox && textbox.current) {
      textbox.current.focus();
    }
  }, [textbox]);
  return (
    <div>
      {content}
      <span
        ref={textbox}
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setValue(e.target.innerText)}
        onKeyDown={(e) => e.key === "Enter" && onComplete(value)}
      >
        {" "}
      </span>
    </div>
  );
};

export default TextArea;
