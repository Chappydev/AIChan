const { useState, useEffect } = require("react");

const useOptions = (refLines, chat, setChat) => {
  const [options, setOptions] = useState([
    {
      name: "particles",
      handler() {
        if (refLines && refLines.length > 0) {
          setChat([
            ...chat,
            {
              role: "user",
              content: "Insert any missing particles from the selection",
              type: "particles",
              raw: {
                role: "user",
                content: refLines.join("\n"),
              },
            },
          ]);
        }
      },
    },
    {
      name: "expand",
      handler() {
        if (refLines && refLines.length > 0) {
          setChat([
            ...chat,
            {
              role: "user",
              content: "Expand any contractions from my selection",
              type: "expand",
              raw: {
                role: "user",
                content: refLines.join("\n"),
              },
            },
          ]);
        }
      },
    },
    {
      name: "translate",
      handler() {
        if (refLines && refLines.length > 0) {
          setChat([
            ...chat,
            {
              role: "user",
              content:
                "Translate my selection to English and explain any parts that may not be accounted for in the translation",
              type: "smartTranslate",
              raw: {
                role: "user",
                content: refLines.join("\n"),
              },
            },
          ]);
        }
      },
    },
  ]);

  useEffect(() => {
    setOptions([
      {
        name: "particles",
        handler() {
          if (refLines && refLines.length > 0) {
            setChat([
              ...chat,
              {
                role: "user",
                content: "Insert any missing particles from the selection",
                type: "particles",
                raw: {
                  role: "user",
                  content: refLines.join("\n"),
                },
              },
            ]);
          }
        },
      },
      {
        name: "expand",
        handler() {
          if (refLines && refLines.length > 0) {
            setChat([
              ...chat,
              {
                role: "user",
                content: "Expand any contractions from my selection",
                type: "expand",
                raw: {
                  role: "user",
                  content: refLines.join("\n"),
                },
              },
            ]);
          }
        },
      },
      {
        name: "translate",
        handler() {
          if (refLines && refLines.length > 0) {
            setChat([
              ...chat,
              {
                role: "user",
                content:
                  "Translate my selection to English and explain any parts that may not be accounted for in the translation",
                type: "smartTranslate",
                raw: {
                  role: "user",
                  content: refLines.join("\n"),
                },
              },
            ]);
          }
        },
      },
    ]);
    // eslint-disable-next-line
  }, [refLines, chat, setChat]);

  return options;
};

export default useOptions;
