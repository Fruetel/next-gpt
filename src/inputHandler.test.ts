import { processInput } from "./inputHandler";

describe("processInput", () => {
  const history = ["You: Hi!", "Bot: Hello!"];

  it("extends the history with the users input", () => {
    const newHistory = processInput("How are you?", history);
    expect(newHistory).toContain("You: How are you?");
  });

  it("extends the history with the bots response", () => {
    const newHistory = processInput("How are you?", history);
    expect(newHistory[3]).toMatch(/Bot:/);
  });
});
