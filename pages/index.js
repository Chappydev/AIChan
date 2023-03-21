import Head from "next/head";
import s from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";

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
          <div>なんかうまいこと使ってやれないの？</div>
          <div>{chat}</div>
        </div>
      </main>
    </>
  );
}
