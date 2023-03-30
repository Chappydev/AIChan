import { getChatResponse } from "../utility/chatFunctions";
import useSWRImmutable from "swr/immutable";
const { useEffect, useState, useRef } = require("react");

const useAssistant = (chat) => {
  let type = useRef();
  let content = useRef();
  let waiting = useRef();

  useEffect(() => {
    const lastMsg = chat.at(-1);

    if (lastMsg && lastMsg.role === "user") {
      type.current = lastMsg.type;
      content.current = lastMsg.content;
      waiting.current = lastMsg.waiting;
    }
  }, [chat]);

  // type !== "custom" condition only for testing purposes
  // replace with:
  // const shouldFetch = type && content;
  const shouldFetch =
    type.current &&
    content.current &&
    !waiting.current &&
    type.current !== "custom";

  // return useSWRImmutable(type && content ? [`/api/${type}`, content] : null, getChatResponse);
  return useSWRImmutable(
    shouldFetch ? [`/api/${type.current}`, content.current] : null,
    getChatResponse,
    {
      errorRetryCount: 2,
    }
  );
};

export default useAssistant;
