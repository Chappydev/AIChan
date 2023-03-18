import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Insert any optional particles that were dropped. Original: お前どこ行くの？ Edited: お前はどこに行くの？ Original: 俺の息子にいいプレゼントを上げたいよ Edited: 俺の息子にいいプレゼントを上げたいよ Original: そういうの使うやつって嫌い Edited: そういうのを使うやつって嫌い Original: なんかうまいこと使ってやれないの？ Edited: ",
        },
      ],
    });
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
