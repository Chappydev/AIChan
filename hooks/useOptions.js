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
              waiting: false,
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
              waiting: false,
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
              waiting: false,
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
      name: "correction",
      handler() {
        const selectedText = refLines.join("\n");
        if (refLines && refLines.length > 0) {
          setChat([
            ...chat,
            {
              role: "user",
              content: `Help me understand this text: ${selectedText}. My understanding is: `,
              type: "correction",
              waiting: true,
              raw: {
                role: "user",
                content: `Briefly tell me what parts of this sentence I am understanding incorrectly, referencing the original text in your explanation.\nOriginal: ${selectedText}\nMy understanding: `,
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
                waiting: false,
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
                waiting: false,
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
                waiting: false,
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
        name: "correction",
        handler() {
          const selectedText = refLines.join("\n");
          if (refLines && refLines.length > 0) {
            setChat([
              ...chat,
              {
                role: "user",
                content: `Help me understand this text: ${selectedText}. My understanding is: `,
                type: "correction",
                waiting: true,
                raw: {
                  role: "user",
                  content: `Briefly tell me what parts of this sentence I am understanding incorrectly, referencing the original text in your explanation.\nOriginal: ${selectedText}\nMy understanding: `,
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
