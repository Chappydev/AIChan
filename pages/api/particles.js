import { applyRateLimiting } from "@/utility/api/rateLimit";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    await applyRateLimiting(req, res);
  } catch {
    return res.status(429).send("Request Limit Exceeded");
  }
  if (!(req.body && req.body.content)) {
    return res.status(400).json({ error: "must include content" });
  }

  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Insert any optional particles that were dropped. Original: お前どこ行くの？ Edited: お前はどこに行くの？ Original: 俺の息子にいいプレゼントを上げてえよ Edited: 俺の息子にいいプレゼントを上げてえよ Original: そういうの使うやつって嫌い Edited: そういうのを使うやつって嫌い Original: 何やってんだ? Edited: 何をやってんだ? Original: ${req.body.content} Edited: `,
        },
      ],
      temperature: 0.1,
    });
    console.log(data);

    res.status(200).json(data.choices[data.choices.length - 1].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
