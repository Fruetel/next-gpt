import bot from "../../bots/ingrid";
import { processInput, regenerateResponse } from "../../inputHandler";

interface Props {
  chatHistory: string[];
  setChatHistory: (history: string[]) => void;
}

export const UserInput: React.FC<Props> = ({ chatHistory, setChatHistory }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.chatInput as HTMLInputElement;
    const newHistory = await processInput(bot, input.value, chatHistory);
    setChatHistory(newHistory);
    input.value = "";
  };

  const handleRecycle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.parentNode.elements
      .chatInput as HTMLInputElement;
    const newHistory = await regenerateResponse(bot, chatHistory);
    setChatHistory(newHistory);
  };

  return (
    <form
      style={{ width: "100%", display: "flex", flexDirection: "row" }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="chatInput"
        style={{
          marginTop: "10px",
          flexGrow: 1,
          padding: "10px",
          boxSizing: "border-box",
        }}
      />
      <button
        type="submit"
        style={{ marginTop: "10px", marginLeft: "5px", padding: "10px" }}
      >
        Say it!
      </button>
      <button
        onClick={handleRecycle}
        style={{ marginTop: "10px", marginLeft: "5px", padding: "10px" }}
      >
        &#9851;
      </button>
    </form>
  );
};
