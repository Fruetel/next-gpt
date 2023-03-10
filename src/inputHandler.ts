const userReference = "You";

export type Botspec = {
  reference: string;
  description: string;
  personality: string;
};

const generateResponse = async (
  bot: Botspec,
  input: string,
  history: string[]
) => {
  const historyLength = history.length;

  const prompt =
    historyLength > 6
      ? `${bot.description}\n\n` +
        "The conversation so far:\n" +
        history.slice(0, -2).join("\n") +
        "\n\n" +
        bot.personality +
        "\n\n" +
        history.slice(-2).join("\n") +
        `\n${userReference}: ${input}\n${bot.reference}:`
      : `${bot.description}\n\n` +
        history.join("\n") +
        `\n${userReference}: ${input}\n${bot.reference}:`;

  console.log(prompt);

  return fetch("/api/gpt_3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { prompt },
    }),
  })
    .then((response) => response.json())
    .then((body) => {
      return body.data.answer;
    })
    .catch((error) => console.error(error));
};

export const regenerateResponse = async (bot: Botspec, history: string[]) => {
  const lastUserLine = history.at(-2) || "";
  const lastUserInput = lastUserLine.slice(userReference.length + 2);

  const response = await generateResponse(
    bot,
    lastUserInput,
    history.slice(0, -2)
  );

  return [...history.slice(0, -1), `${bot.reference}: ${response}`];
};

export const processInput = async (
  bot: Botspec,
  input: string,
  history: string[]
) => {
  const response = await generateResponse(bot, input, history);

  return [
    ...history,
    `${userReference}: ${input}`,
    `${bot.reference}: ${response}`,
  ];
};
