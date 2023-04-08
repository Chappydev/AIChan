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
  const { content } = req.body;

  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: content,
      temperature: 0.5,
    });
    console.log(data);

    res.status(200).json(data.choices[data.choices.length - 1].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
