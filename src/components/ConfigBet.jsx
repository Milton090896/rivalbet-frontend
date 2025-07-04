import React, { useState, useEffect } from "react";

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
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    if (Number(betAmount) >= 10 && Number(betAmount) <= balance) {
      setMensagemErro("");
    }
  }, [betAmount, balance]);

  const calcularPremio = () => {
    const aposta = Number(betAmount);
    if (isNaN(aposta) || aposta < 10) return null;

    if (mode === "1x1") {
      const ganhoBruto = aposta * 2;
      const ganhoLiquido = ganhoBruto * 0.9;
      return {
        texto: `💸 Se ganhar, receberá: ${ganhoLiquido.toFixed(2)} MZN (90% de ${ganhoBruto})`,
      };
    } else if (mode === "torneio") {
      const totalPremio = aposta * participants;
      const liquido = totalPremio * 0.9;
      const primeiro = (liquido * 0.7).toFixed(2);
      const segundo = (liquido * 0.3).toFixed(2);
      return {
        texto: `🥇 1º lugar: ${primeiro} MZN | 🥈 2º lugar: ${segundo} MZN`,
      };
    }
    return null;
  };

  const handleStart = () => {
    const aposta = Number(betAmount);

    if (isNaN(aposta) || aposta < 10) {
      setMensagemErro("⚠️ Aposta mínima é de 10 MZN.");
      return;
    }

    if (aposta > balance) {
      setMensagemErro("⚠️ Saldo insuficiente.");
      return;
    }

    setMensagemErro("");
    onStartGame({ bet: aposta, participantsCount: Number(participants) });
  };

  const premio = calcularPremio();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border-2 border-blue-600 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Configurar Aposta ({mode === "1x1" ? "Modo 1x1" : "Torneio"})
      </h2>

      <div className="text-gray-700 mb-2 font-semibold">
        💰 Saldo disponível: <span className="text-black">{balance.toFixed(2)} MZN</span>
      </div>

      <label className="block mb-2 font-medium">Valor da Aposta (mínimo 10 MZN):</label>
      <input
        type="number"
        className="w-full p-3 border rounded-md mb-4"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Digite o valor da aposta"
      />

      {mode === "torneio" && (
        <>
          <label className="block mb-2 font-medium">Número de Participantes:</label>
          <input
            type="number"
            className="w-full p-3 border rounded-md mb-4"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="Ex: 10"
          />
        </>
      )}

      {mensagemErro && (
        <div className="text-red-600 text-sm font-semibold mb-3">{mensagemErro}</div>
      )}

      {premio && (
        <div className="text-green-700 font-medium mb-4">{premio.texto}</div>
      )}

      <div className="text-xs text-gray-600 italic mb-6">
        ⚠️ Todos os prêmios exibidos já consideram o desconto de 10% da casa.
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-1/2 py-3 px-4 bg-gray-300 hover:bg-gray-400 rounded-lg font-bold"
        >
          Voltar
        </button>
        <button
          onClick={handleStart}
          className="w-1/2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
        >
          Confirmar aposta
        </button>
      </div>
    </div>
  );
}
