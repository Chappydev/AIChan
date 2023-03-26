const { useState, useEffect } = require("react");

const useOptions = (refLines, chat, setChat) => {
  const [options, setOptions] = useState({
    particles: {
      handler() {
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
      },
    },
  });

  useEffect(() => {
    console.log(`in useEffect`);
    setOptions({
      particles: {
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
    });
    // eslint-disable-next-line
  }, [refLines, setChat]);

  return options;
};

export default useOptions;
