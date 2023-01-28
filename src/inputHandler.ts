const userReference = "You";
const botReference = "Bot";

const generateResponse = (input: string): string => {
  return `You said: ${input}`;
};

export const processInput = (input: string, history: string[]) => {
  return [
    `${botReference}: ${generateResponse(input)}`,
    `${userReference}: ${input}`,
    ...history,
  ];
};
