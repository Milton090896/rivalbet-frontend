// src/components/Scoreboard.jsx
import React from "react";
import "../styles/Football.css";

export default function Scoreboard({ score }) {
  return (
    <div className="scoreboard">
      <div className="player-score">
        <span>Jogador A</span>
        <h2>{score.A}</h2>
      </div>
      <div className="player-score">
        <span>Jogador B</span>
        <h2>{score.B}</h2>
      </div>
    </div>
  );
}
