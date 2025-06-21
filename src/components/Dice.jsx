import React from "react";
import "../styles/Dice.css";

export default function Dice({ value, onRoll, currentPlayer }) {
  return (
    <div className="dice-wrapper">
      <button className="dice-button" onClick={onRoll}>
        🎲 {value > 0 ? value : "Rolar"}
      </button>
      <p className="current-turn">Vez de: Jogador {currentPlayer + 1}</p>
    </div>
  );
}
