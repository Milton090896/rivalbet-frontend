import React from "react";

export default function ModeSelection({ balance, onSelectMode }) {
  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl border-2 border-red-500 space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-center text-red-600">
        Bem-vindo ao RivalQuiz
      </h1>

      <div className="text-gray-700 text-sm leading-relaxed bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <p className="mb-2">
          🎯 <strong>Como funciona:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            No <strong>modo 1x1</strong>, você joga contra outro participante. Quem tiver melhor desempenho leva o prêmio.
            Em caso de equilíbrio, o valor da aposta é devolvido parcialmente.
          </li>
          <li>
            No <strong>modo torneio</strong>, vários jogadores competem entre si. Quem tiver o melhor desempenho fica em 1º lugar e recebe a maior parte do prêmio. O 2º lugar recebe uma parte menor.
          </li>
          <li>
            🧠 As perguntas são de futebol, e você deve responder o máximo que conseguir dentro do tempo!
          </li>
          <li>
            🪙 A casa retém 10% de cada aposta como taxa.
          </li>
        </ul>
      </div>

      <p className="text-center text-gray-600 font-medium">
        Seu saldo atual: <span className="font-bold text-green-700">{balance.toFixed(2)} MZN</span>
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
        <button
          onClick={() => onSelectMode("1x1")}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Modo 1x1
        </button>

        <button
          onClick={() => onSelectMode("torneio")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Modo Torneio
        </button>
      </div>
    </div>
  );
}
