import React, { useState } from "react";
import ModeSelection from "./ModeSelection";
import ConfigBet from "./ConfigBet";
import QuizGame from "./QuizGame";

export default function RivalQuizManager() {
  const [fase, setFase] = useState("modo");
  const [modoSelecionado, setModoSelecionado] = useState(null);
  const [aposta, setAposta] = useState(0);
  const [participantes, setParticipantes] = useState(10);
  const [saldo, setSaldo] = useState(2500);

  const handleSelecionarModo = (modo) => {
    setModoSelecionado(modo);
    setFase("config");
  };

  const handleConfigurarAposta = ({ bet, participantsCount }) => {
    setAposta(bet);
    setParticipantes(participantsCount);
    setFase("jogo");
  };

  const handleAtualizarSaldo = (novoSaldo) => {
    setSaldo(novoSaldo);
  };

  const handleVoltar = () => {
    setFase("modo");
  };

  return (
    <div className="p-4">
      {fase === "modo" && (
        <ModeSelection balance={saldo} onSelectMode={handleSelecionarModo} />
      )}
      {fase === "config" && modoSelecionado && (
        <ConfigBet
          mode={modoSelecionado}
          balance={saldo}
          betAmount={aposta}
          setBetAmount={setAposta}
          participants={participantes}
          setParticipants={setParticipantes}
          onStartGame={handleConfigurarAposta}
          onBack={handleVoltar}
        />
      )}
      {fase === "jogo" && (
        <QuizGame
          initialBalance={saldo}
          setBalance={handleAtualizarSaldo}
          modo={modoSelecionado}
          apostado={aposta}
          participantes={participantes}
        />
      )}
    </div>
  );
}
