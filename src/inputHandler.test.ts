import { processInput } from "./inputHandler";
import fetchMock from "fetch-mock-jest";

describe("processInput", () => {
  const history = ["You: Hi!", "Bot: Hello!"];

  beforeEach(() => {
    fetchMock.post("https://api.openai.com/", {
      status: 200,
      body: { data: [] },
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("extends the history with the users input", () => {
    const newHistory = processInput("How are you?", history);
    expect(newHistory).toContain("You: How are you?");
  });

  it("extends the history with the bots response", async () => {
    const newHistory = await processInput("How are you?", history);
    expect(newHistory[0]).toMatch(/Bot: You said/);
  });
});
