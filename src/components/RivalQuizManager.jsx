import React, { useState } from "react";
import ModeSelection from "./ModeSelection";
import ConfigBet from "./ConfigBet";
import QuizGame from "./QuizGame";

export default function RivalQuizManager() {
  const [stage, setStage] = useState("selectMode");
  const [mode, setMode] = useState(null); // '1x1' ou 'tournament'
  const [balance, setBalance] = useState(2500);
  const [betAmount, setBetAmount] = useState(100);
  const [participants, setParticipants] = useState(7);
  const [lastResult, setLastResult] = useState(null);

  function handleSelectMode(selectedMode) {
    setMode(selectedMode);
    setStage("configBet");
  }

  function handleStartGame({ bet, participantsCount }) {
    if (mode === "1x1") setParticipants(1);
    else setParticipants(participantsCount);

    setBalance((prev) => (prev - bet < 0 ? 0 : prev - bet));
    setBetAmount(bet);
    setStage("quiz");
  }

  function handleGameEnd({ correctCount }) {
    let updatedBalance = balance;
    let gain = 0;

    if (mode === "1x1") {
      if (correctCount > 5) {
        gain = betAmount * 1.8 * 0.9; // ganha 90% da aposta do adversário + a sua
        updatedBalance += gain;
      } else if (correctCount === 5) {
        gain = betAmount * 0.9; // empate, recebe 90% da aposta
        updatedBalance = updatedBalance - betAmount + gain;
      } else {
        gain = 0; // perdeu a aposta já descontada
      }
    } else {
      const totalPool = betAmount * participants;
      const poolAfterHouse = totalPool * 0.9;

      if (correctCount > 5) {
        gain = poolAfterHouse * 0.7;
        updatedBalance += gain;
      } else if (correctCount === 5) {
        gain = poolAfterHouse * 0.3;
        updatedBalance += gain;
      } else {
        gain = 0;
      }
    }

    setBalance(updatedBalance < 0 ? 0 : updatedBalance);
    setLastResult({ correctCount, gain, updatedBalance });
    setStage("result");
  }

  function handleRestart() {
    setStage("selectMode");
    setMode(null);
    setBetAmount(100);
    setParticipants(7);
    setLastResult(null);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {stage === "selectMode" && (
        <ModeSelection balance={balance} onSelectMode={handleSelectMode} />
      )}

      {stage === "configBet" && (
        <ConfigBet
          mode={mode}
          balance={balance}
          onStartGame={handleStartGame}
          participants={participants}
          setParticipants={setParticipants}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          onBack={() => setStage("selectMode")}
        />
      )}

      {stage === "quiz" && (
        <QuizGame
          mode={mode}
          betAmount={betAmount}
          participants={participants}
          balance={balance}
          onGameEnd={handleGameEnd}
        />
      )}

      {stage === "result" && lastResult && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Resultado Final</h2>
          <p className="mb-2">
            Você acertou <strong>{lastResult.correctCount}</strong> perguntas.
          </p>
          {lastResult.gain > 0 && (
            <p className="text-green-700 font-bold mb-4">
              Você ganhou: {lastResult.gain.toFixed(2)} MZN
            </p>
          )}
          {lastResult.gain === 0 && <p className="mb-4">Você perdeu sua aposta.</p>}
          {lastResult.gain < 0 && (
            <p className="text-red-700 font-bold mb-4">
              Você perdeu: {(-lastResult.gain).toFixed(2)} MZN
            </p>
          )}
          <p className="mb-6">Saldo atual: {lastResult.updatedBalance.toFixed(2)} MZN</p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
}
