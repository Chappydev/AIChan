import TourLanguageOption from "@/components/TourLanguageOption";

export const tourSteps = [
  {
    target: "body",
    content:
      "Select a language to continue. Please note that the application is currently built for English speakers who are learning Japanese.\n\nツアーの言語をご選択下さい。現在、このアプリは日本語学習者向けに作られているのでご注意下さい。",
    placement: "center",
  },
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

const EN_CONTENT = [
  <TourLanguageOption onEnglish={onEnglish} onJapanese={onJapanese} />,
  "Welcome to AIChan - your AI-powered language assistant! Let's begin with a quick tour of the demo, shall we?",
  "This is the area where your text would show up. As this is a demo, we've simply loaded in some text from a random show, but this section may later be filled with text from various sources (eg. subtitles from a show, lines from a novel, etc.)",
  "You can select one or more lines by clicking the selector next to it. These lines will be referenced when interacting with the assistant. Try selecting this line before we check out the assistant itself!",
  "This is your Japanese assistant! It's loaded with built-in functions to help you get more out of native text. Some features include expanding contractions and correcting your understanding.",
  "Built in functions of the assistant are listed here. They will automatically act on your selected lines from the text view.",
  <div>
    Here you can ask your custom questions/prompts. You can also ask follow up
    questions about previous responses here. To reference your selected lines
    here, simply type '<code>{"{lines}"}</code>' and it will be replaced
    automatically.
  </div>,
  "Hopefully you can see how powerful AIChan could be for language learning. Do be careful though, as the assistant can and does make mistakes.",
];

const JP_CONTENT = [
  <TourLanguageOption onEnglish={onEnglish} onJapanese={onJapanese} />,
  "AIの力を用いた言語学習アシスタント、AIChanへようこそ！それでは、早速見ていきましょう！",
  "ここにあなたのテキストが表示されます。デモンストレーションのためにある番組のセリフをいくつか用意しましたが、Videoの方を使っていただくとあなたが見ている番組などの字幕がこの欄に表示されます。",
  "テキストの横にある丸をクリックすることでその１行を選択することができます。１行以上を選択しないと言語学習アシスタントは使用できませんので、早速この１行を選択してアシスタントの機能を見ていきましょう。",
  "こちらはあなたの日本語アシスタントです！日本語ネイティブのテキストから学ぶのに特化した機能がいっぱい組み込まれています。例えば、省略された助詞を入れ直したり(particles)、自分の翻訳を直したり(correction)などがあります。",
  "組み込み機能はここに表示されます。これらは選択されたテキストを自動に使用します。",
  <div>
    こちらでは質問やプロンプトを自由に書くことが出来ます。アシスタントの回答にわからないことでもあれば、ここで追加質問も出来ます。
    選択されたテキストを引用したかったら '<code>{"{lines}"}</code>'
    と書くと自動に書き換えられます。ぜひ使ってみてください！
  </div>,
  "それでは、ツアーは以上となります。AIChanを使って、あなたの言語学習がもっと楽しくもっと効率的にできることをご想像頂けたでしょうか。しかし、AIChanはAIであり、間違いを起こすことは時々あります。ご注意下さい。",
];

function setContent(steps, content) {
  steps.forEach((step, i) => (step.content = content[i]));
  return steps;
}
setContent(tourSteps, EN_CONTENT);

// Define our state
export const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  lang: "EN",
  steps: tourSteps,
};

let currentContent = EN_CONTENT;

function onEnglish() {
  currentContent = EN_CONTENT;
}

function onJapanese() {
  currentContent = JP_CONTENT;
}

// Set up the reducer function
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      setContent(state.steps, currentContent);
      return { ...state, run: true, steps: state.steps };
    case "RESET":
      setContent(state.steps, currentContent);
      return { ...state, stepIndex: 0, steps: state.steps };
    case "STOP":
      setContent(state.steps, currentContent);
      return { ...state, run: false, steps: state.steps };
    case "NEXT_OR_PREV":
      setContent(state.steps, currentContent);
      return { ...state, ...action.payload, steps: state.steps };
    // case "SWITCH_LANG":
    //   setContent(state.steps, currentContent);
    //   return { ...state, lang: newLang, steps: state.steps };
    case "RESTART":
      setContent(state.steps, currentContent);
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
        steps: state.steps,
      };
    default:
      return state;
  }
};
