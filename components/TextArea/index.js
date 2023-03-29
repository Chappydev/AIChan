import React, { useEffect, useRef } from "react";

const TextArea = ({ content = "" }) => {
  const textbox = useRef();
  useEffect(() => {
    if (textbox && textbox.current) {
      textbox.current.focus();
    }
  }, [textbox]);
  return (
    <div>
      {content}
      <span ref={textbox} role="textbox" contentEditable>
        {" "}
      </span>
    </div>
  );
};

export default TextArea;
