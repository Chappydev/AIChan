import { getChatResponse } from "../utility/chatFunctions";
import useSWRImmutable from "swr/immutable";
const { useEffect, useRef } = require("react");

const useAssistant = (chat, setChat) => {
  let type = useRef();
  let content = useRef();
  let waiting = useRef();

  useEffect(() => {
    const lastMsg = chat.at(-1);

    if (lastMsg && lastMsg.role === "user") {
      type.current = lastMsg.type;
      content.current =
        lastMsg.type === "custom"
          ? chat.filter((msg) => msg.raw).map((msg) => msg.raw)
          : lastMsg.raw.content;
      waiting.current = lastMsg.waiting;
    }
  }, [chat]);

  // custom condition only for testing purposes
  const shouldFetch =
    type.current &&
    content.current &&
    !waiting.current &&
    (type.current === "custom"
      ? !content.current[content.current.length - 1].content.startsWith("//")
      : true);

  const response = useSWRImmutable(
    shouldFetch ? [`/api/${type.current}`, content.current] : null,
    getChatResponse,
    {
      errorRetryCount: 2,
    }
  );

  useEffect(() => {
    if (response.data) {
      const { data } = response;
      const newChat = {
        content: data.content,
        role: data.role,
        type: chat[chat.length - 1],
        raw: data,
      };
      setChat([...chat, newChat]);
    }
    // eslint-disable-next-line
  }, [response.data]);

  return response;
};

export default useAssistant;
