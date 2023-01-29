const userReference = "You";
const botReference = "Bot";

const generateResponse = async (input: string, history: string[]) => {
  return fetch("/api/gpt_3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        prompt:
          history.join("\n") + `\n${userReference}: ${input}\n${botReference}:`,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.answer;
    })
    .catch((error) => console.error(error));
};

export const processInput = async (input: string, history: string[]) => {
  const response = await generateResponse(input, history);
  return [
    `${botReference}: ${response}`,
    `${userReference}: ${input}`,
    ...history,
  ];
};
