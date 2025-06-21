import React, { useState } from "react";
import Dice from "../components/Dice";
import "../styles/Ludo.css";

const initialPositions = Array(4).fill(null).map(() => ({
  pieces: [null, null, null, null], // null = casa, número = posição no caminho
}));

const PATH_LENGTH = 52;
const HOME_PATH_LENGTH = 6;

export default function Ludo() {
  const [players, setPlayers] = useState(initialPositions);
  const [dice, setDice] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDice(value);
  };

  const movePiece = (pieceIndex) => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const pos = newPlayers[currentPlayer].pieces[pieceIndex];

      // Peça ainda em casa e tirou 6
      if (pos === null && dice === 6) {
        newPlayers[currentPlayer].pieces[pieceIndex] = currentPlayer * 13;
      }
      // Peça já em campo
      else if (pos !== null) {
        let newPos = (pos + dice) % PATH_LENGTH;
        newPlayers[currentPlayer].pieces[pieceIndex] = newPos;
      }

      return newPlayers;
    });

    // Se tirou 6, repete a vez
    if (dice !== 6) {
      setCurrentPlayer((prev) => (prev + 1) % 4);
    }

    setDice(0);
  };

  const renderPieces = () => {
    const all = [];
    players.forEach((player, playerIndex) => {
      player.pieces.forEach((pos, i) => {
        if (pos !== null) {
          all.push(
            <div
              key={`${playerIndex}-${i}`}
              className={`piece player-${playerIndex}`}
              style={{
                gridArea: `p${pos}`,
              }}
              onClick={() => movePiece(i)}
            />
          );
        }
      });
    });
    return all;
  };

  return (
    <div className="ludo-board">
      <Dice value={dice} onRoll={rollDice} currentPlayer={currentPlayer} />
      <div className="board">
        {renderPieces()}
      </div>
    </div>
  );
}
