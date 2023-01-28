import { useState } from "react";
import { CenteredContainer } from "../UserInput/styles";
import { centeredContainer } from "./styles";

interface Props {
  chatHistory: string[];
}

export const History: React.FC<Props> = ({ chatHistory }) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#cfcfcf",
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {chatHistory.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};
