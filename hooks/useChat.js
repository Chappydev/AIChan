const { useRef, useEffect, useState } = require("react");

const initialMessage = {
  role: "assistant",
  content:
    "I'm your Japanese learning assistant!\n\nHow can I help you?\n\nSelect a premade option or type your question/prompt",
  // 'raw' is the unaltered message data (for sending to api)
  // null indicates that this message should not be included in requests
  type: "initial",
  raw: null,
};

const useChat = (refLines) => {
  const [chat, setChat] = useState([initialMessage]);

  const ref = useRef();
  let chatLengthRef = useRef(chat.length);

  // Scroll any new messages into view
  useEffect(() => {
    if (ref?.current && chat.length > chatLengthRef.current) {
      chatLengthRef++;
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, chat]);

  useEffect(() => {
    console.log("refLines changed");
    if (chat.length > 1) {
      console.log("resetting chat");
      setChat([initialMessage]);
    }
    // eslint-disable-next-line
  }, [refLines, setChat]);

  return { chat, setChat, ref };
};

export default useChat;
