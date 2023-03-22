import Head from "next/head";
import s from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";
import TextLine from "@/components/TextLine";

const lines = [
  "大使館まではどれくらいかね。",
  "恐らく、２０分程度かと…。",
  "あれ？ブレーキが…。",
  "あっ…お…おい！",
  "君！前！前！",
  "ああっ！",
  "オスタニアにおいて、我が国の外交官が事故死した。だが当局は、東の極右政党による、暗殺と見ている。",
  "ヤツらは、我がウェスタリスへの戦争を企てている。なんとしても、その計画を突き止めねば…。",
  "彼に任せよう。うちで最も腕の立つエージェント…黄昏。",
  "約束の物だ。",
  "外務大臣がヅラだという証拠写真。ネガもある。",
  "よくやった。",
  "これでヤツを辞任に追い込める。次も、頼んだぞ。",
  "おい。",
  "あっ…。",
];

export default function Home() {
  const [chat, setChat] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("api/assistant");
        const data = await response.json();
        console.log(data);
        setChat(data.choices[0].message.content);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Japanese Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={s.main}>
        <div className={s.wrapper}>
          <div>
            {lines.map((line, ind) => (
              <TextLine text={line} key={ind} />
            ))}
          </div>
          <div>{chat}</div>
        </div>
      </main>
    </>
  );
}
