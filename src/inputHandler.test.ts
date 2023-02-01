import { processInput, type Botspec } from "./inputHandler";
import fetchMock from "fetch-mock-jest";

describe("processInput", () => {
  const history = ["You: Hi! I'm Tom.", "Bot: Hello Tom! I'm Marvin."];

  const bot: Botspec = {
    reference: "Bot",
    description: "Bot description",
    personality: "Bot personality",
  };

  beforeEach(() => {
    fetchMock.post("/api/gpt_3", {
      status: 200,
      body: { data: { answer: "This is the bots reply" } },
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("extends the history with the users input", async () => {
    const newHistory = await processInput(bot, "How are you, Marvin?", history);
    expect(newHistory[newHistory.length - 2]).toEqual(
      "You: How are you, Marvin?"
    );
  });

  it("extends the history with the bots responses", async () => {
    const newHistory = await processInput(bot, "How are you?", history);
    expect(newHistory[1]).toEqual("Bot: Hello Tom! I'm Marvin.");
    expect(newHistory[3]).toEqual("Bot: This is the bots reply");

    const newerHistory = await processInput(
      bot,
      "Latest question from user",
      newHistory
    );

    expect(newerHistory[4]).toEqual("You: Latest question from user");
    expect(newerHistory[5]).toMatch(/: This is the bots reply/);
  });

  it("Builds a prompt from the history", async () => {
    await processInput(bot, "How are you?", history);

    expect(fetchMock).toHaveFetched("/api/gpt_3", {
      method: "POST",
      body: {
        data: {
          prompt:
            "Bot description\n\nYou: Hi! I'm Tom.\nBot: Hello Tom! I'm Marvin.\nYou: How are you?\nBot:",
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("Reinforces the bots personality as the conversation evolves", async () => {
    const firstIteration = await processInput(bot, "How are you 1?", history);
    const secondIteration = await processInput(
      bot,
      "How are you 2?",
      firstIteration
    );
    const thirdIteration = await processInput(
      bot,
      "How are you 3?",
      secondIteration
    );

    await processInput(bot, "How are you 4?", thirdIteration);

    const expectedPrompt =
      "Bot description\n\nThe conversation so far:\nYou: Hi! I'm Tom.\nBot: Hello Tom! I'm Marvin.\nYou: How are you 1?\nBot: This is the bots reply\nYou: How are you 2?\nBot: This is the bots reply\n\nBot personality\n\nYou: How are you 3?\nBot: This is the bots reply\nYou: How are you 4?\nBot:";

    expect(fetchMock).toHaveFetched("/api/gpt_3", {
      method: "POST",
      body: {
        data: {
          prompt: expectedPrompt,
        },
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
