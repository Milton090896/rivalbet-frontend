import React from "react";

export default function ConfigBet({
  mode,
  balance,
  betAmount,
  setBetAmount,
  participants,
  setParticipants,
  onStartGame,
  onBack,
}) {
  const minBet = 10;

  function handleStart() {
    if (betAmount > balance) {
      alert("⚠️ Valor da aposta é maior que o saldo disponível!");
      return;
    }
    if (betAmount < minBet) {
      alert("⚠️ O valor mínimo para apostar é 10 MZN!");
      return;
    }
    if (mode === "tournament" && (participants < 7 || participants > 16)) {
      alert("⚠️ Número de jogadores deve estar entre 7 e 16!");
      return;
    }
    onStartGame({ bet: betAmount, participantsCount: participants });
  }

  return (
    <div className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        {mode === "1x1" ? "Configurar Aposta - Modo 1x1" : "Configurar Aposta - Modo Torneio"}
      </h2>
      <div>
        <label htmlFor="betAmount" className="block mb-2 font-semibold">
          Valor da aposta (mínimo 10 MZN)
        </label>
        <input
          type="number"
          id="betAmount"
          min={minBet}
          max={balance}
          value={betAmount}
          onChange={(e) => setBetAmount(Math.min(Math.max(minBet, Number(e.target.value)), balance))}
          className="w-full border border-gray-400 rounded px-3 py-2 text-lg"
        />
      </div>

      {mode === "tournament" && (
        <div>
          <label htmlFor="participants" className="block mb-2 font-semibold">
            Número de jogadores (7 a 16)
          </label>
          <input
            type="number"
            id="participants"
            min={7}
            max={16}
            value={participants}
            onChange={(e) => setParticipants(Math.min(Math.max(7, Number(e.target.value)), 16))}
            className="w-full border border-gray-400 rounded px-3 py-2 text-lg"
          />
        </div>
      )}

      <div className="mt-4 text-lg font-semibold text-center">
        {mode === "1x1" ? (
          <>
            <p>
              Potencial ganho se vencer:{" "}
              <span className="text-green-600">{(betAmount * 1.8 * 0.9).toFixed(2)} MZN</span>
            </p>
            <p>
              Potencial ganho em empate:{" "}
              <span className="text-yellow-600">{(betAmount * 0.9).toFixed(2)} MZN</span>
            </p>
          </>
        ) : (
          <>
            <p>
              Potencial prêmio 1º lugar:{" "}
              <span className="text-green-600">{(betAmount * participants * 0.9 * 0.7).toFixed(2)} MZN</span>
            </p>
            <p>
              Potencial prêmio 2º lugar:{" "}
              <span className="text-yellow-600">{(betAmount * participants * 0.9 * 0.3).toFixed(2)} MZN</span>
            </p>
            <p>
              Prêmio baseado em {participants} jogadores apostando {betAmount.toFixed(2)} MZN
            </p>
          </>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-100 transition"
        >
          Voltar
        </button>
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
        >
          Iniciar jogo
        </button>
      </div>

      <div className="mt-6 text-lg text-center">
        Saldo atual: <span className="font-bold text-yellow-600">{balance.toFixed(2)} MZN</span>
      </div>
    </div>
  );
}
