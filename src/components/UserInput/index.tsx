import { processInput } from "../../inputHandler";

interface Props {
  chatHistory: string[];
  setChatHistory: (history: string[]) => void;
}

export const UserInput: React.FC<Props> = ({ chatHistory, setChatHistory }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.chatInput as HTMLInputElement;
    const newHistory = await processInput(input.value, chatHistory);
    setChatHistory(newHistory);
    input.value = "";
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <input
        type="text"
        name="chatInput"
        style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
      />
    </form>
  );
};
