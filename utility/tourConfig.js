export const TOUR_STEPS = [
  {
    target: "body",
    content:
      "Welcome to AIChan - your AI-powered language assistant! Let's begin with a quick tour of the demo, shall we?",
    placement: "center",
  },
  {
    target: "#textArea",
    content:
      "This is the area where your text would show up. As this is a demo, we've simple loaded in some text from a random show, but this section may later be filled with text from various sources (eg. subtitles from a show, lines from a novel, etc.)",
    disableBeacon: true,
  },
  {
    target: "#lineSelector",
    content:
      "You can select one or more lines by clicking the selector next to it. These lines will be referenced when interacting with the assistant. Try selecting this line before we check out the assistant itself!",
    spotlightClicks: true,
    hideBackButton: true,
    hideCloseButton: true,
    disableOverlayClose: true,
    hideFooter: true,
    disableBeacon: true,
  },
  {
    target: "#initMessage",
    content:
      "This is your Japanese assistant! It's loaded with built-in functions to help you get more out of native text. Some features include expanding contractions and correcting your understanding.",
    placement: "left",
  },
  {
    target: "#initChips",
    content:
      "Built in functions of the assistant are listed here. They will automatically act on your selected lines from the text view.",
    placement: "left",
  },
  {
    target: "#chatInput",
    content: (
      <div>
        Here you can ask your custom questions/prompts. You can also ask follow
        up questions about previous responses here. To reference your selected
        lines here, simply type '<code>{"{lines}"}</code>' and it will be
        replaced automatically.
      </div>
    ),
    placement: "top",
  },
  {
    target: "body",
    content:
      "Hopefully you can see how powerful AIChan could be for language learning. Do be careful though, as the assistant can and does make mistakes.",
    placement: "center",
  },
];

// Define our state
export const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

// Set up the reducer function
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};
