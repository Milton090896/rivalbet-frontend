import React from "react";

export default function ModeSelection({ balance, onSelectMode }) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Bem-vindo ao RivalQuiz!</h1>
      <p className="text-lg max-w-xl mx-auto">
        Escolha seu modo de jogo e aposte seu saldo fictício para desafiar outros apostadores.
      </p>
      <p className="text-sm max-w-xl mx-auto text-gray-700">
        <strong>Modo 1x1:</strong> Aposte contra um único adversário. Se você tiver mas acertos, ganha 90% do valor total competido. Se tiver o numero exacto de acertividade, recebe 90% do valor da aposta. Se perder, perde sua aposta.
        <br />
        <strong>Modo Torneio:</strong> Escolha entre 7 e 16 jogadores para competir. Se você terminar em 1º lugar, ganha 70% do total arrecadado (menos 10% ). Se terminar em 2º lugar, ganha 30% do total (menos 10% ). Caso contrário, perde sua aposta.
        Boa Sorte
      </p>
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => onSelectMode("1x1")}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
        >
          Modo 1x1
        </button>
        <button
          onClick={() => onSelectMode("tournament")}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
        >
          Modo Torneio
        </button>
      </div>
      <div className="mt-8 text-lg">
        Saldo atual: <span className="font-bold text-yellow-600">{balance.toFixed(2)} MZN</span>
      </div>
    </div>
  );
}
