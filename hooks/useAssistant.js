import { getChatResponse } from "../utility/chatFunctions";
import useSWRImmutable from "swr/immutable";
const { useEffect, useState } = require("react");

const useAssistant = (chat) => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const lastMsg = chat.at(-1);

    if (lastMsg && lastMsg.role === "user") {
      setType(lastMsg.type);
      setContent(lastMsg.raw.content);
    }
  }, [chat]);

  // type !== "custom" condition only for testing purposes
  // replace with:
  // const shouldFetch = type && content;
  const shouldFetch = type && content && type !== "custom";

  // return useSWRImmutable(type && content ? [`/api/${type}`, content] : null, getChatResponse);
  return useSWRImmutable(
    shouldFetch ? [`/api/${type}`, content] : null,
    getChatResponse,
    {
      errorRetryCount: 2,
    }
  );
};

export default useAssistant;
