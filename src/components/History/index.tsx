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
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#cfcfcf",
        display: "flex",
        flexDirection: "column-reverse",
        overflow: "auto",
        padding: "5px",
        fontFamily: "arial, helvetica, sans-serif",
        fontSize: "14pt",
      }}
    >
      <div>
        {chatHistory.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
};
