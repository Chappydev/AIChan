import React, { useReducer } from "react";

const TourLanguageOption = ({ onEnglish, onJapanese }) => {
  return (
    <div>
      <p>
        Select a language for the demo and then click next. Please note that the
        application is currently built for English speakers who are learning
        Japanese.
      </p>
      <p>
        ツアーの言語をクリック後、「Next」ボタンをクリックしてください。現在、このアプリは日本語学習者向けに作られているのでご注意下さい。
      </p>
      <div>
        <button
          style={{
            border: "none",
            font: "inherit",
            borderRadius: "10px",
            padding: "1rem",
            lineHeight: 0,
            cursor: "pointer",
            backgroundColor: "rgba(58, 87, 255, 1)",
            fontSize: "1.0625rem",
            marginRight: "20px",
          }}
          onClick={() => onEnglish()}
        >
          English
        </button>
        <button
          style={{
            border: "none",
            font: "inherit",
            borderRadius: "10px",
            padding: "1rem",
            lineHeight: 0,
            cursor: "pointer",
            backgroundColor: "rgba(58, 87, 255, 1)",
            fontSize: "1.0625rem",
          }}
          onClick={() => onJapanese()}
        >
          日本語
        </button>
      </div>
    </div>
  );
};

export default TourLanguageOption;
