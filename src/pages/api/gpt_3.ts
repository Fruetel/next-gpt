// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  data: { answer: string };
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.data.prompt,
    max_tokens: 100,
    top_p: 0.5,
    frequency_penalty: 0.4,
    presence_penalty: 0.3,
  });

  const answer = response.data.choices[0].text;

  if (!answer) {
    res.status(500);
  } else {
    res.status(200).json({ data: { answer: answer } });
  }
}
