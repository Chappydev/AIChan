const { useRef, useEffect, useState, useCallback } = require("react");

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
  const onComplete = useCallback((txt) => {
    setChat((currChat) =>
      currChat.map((msg) => {
        if (msg.waiting) {
          return {
            ...msg,
            content: msg.content.concat(txt),
            waiting: false,
            raw: { ...msg.raw, content: msg.raw.content.concat(txt) },
          };
        }
        return msg;
      })
    );
  }, [chat, setChat]);

  const ref = useRef();
  let chatLengthRef = useRef(0);

  // Scroll any new messages into view
  useEffect(() => {
    if (ref?.current?.children.length > chatLengthRef.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      chatLengthRef.current = ref?.current?.children.length;
    } else if (ref?.current?.children.length !== chatLengthRef.current) {
      chatLengthRef.current = ref?.current?.children.length;
    }
  });

  useEffect(() => {
    if (chat.length > 1) {
      setChat([initialMessage]);
    }
    // eslint-disable-next-line
  }, [refLines, setChat]);

  return { chat, setChat, ref, onComplete };
};

export default useChat;
