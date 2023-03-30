import React, { useEffect, useRef, useState } from "react";

const TextArea = ({ content = "" }) => {
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
      >
        {" "}
      </span>
    </div>
  );
};

export default TextArea;
