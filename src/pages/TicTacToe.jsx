import { useState } from "react";

export default function TicTacToe() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogadorX, setJogadorX] = useState(true);
  const [vencedor, setVencedor] = useState(null);

  const verificarVencedor = (tab) => {
    const combinacoes = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let [a,b,c] of combinacoes) {
      if (tab[a] && tab[a] === tab[b] && tab[a] === tab[c]) {
        return tab[a];
      }
    }

    return tab.includes(null) ? null : "Empate";
  };

  const clicar = (index) => {
    if (tabuleiro[index] || vencedor) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = jogadorX ? "X" : "O";
    setTabuleiro(novoTabuleiro);

    const resultado = verificarVencedor(novoTabuleiro);
    setVencedor(resultado);
    setJogadorX(!jogadorX);
  };

  const reiniciar = () => {
    setTabuleiro(Array(9).fill(null));
    setJogadorX(true);
    setVencedor(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Jogo da Velha - Rivalbet</h1>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {tabuleiro.map((valor, index) => (
          <div
            key={index}
            onClick={() => clicar(index)}
            className="w-24 h-24 bg-white border-2 border-blue-600 flex items-center justify-center text-4xl font-bold rounded hover:bg-blue-200 cursor-pointer"
          >
            {valor}
          </div>
        ))}
      </div>

      {vencedor && (
        <div className="text-xl font-semibold text-green-700 mb-4">
          {vencedor === "Empate" ? "Empate!" : `Jogador ${vencedor} venceu!`}
        </div>
      )}

      <button
        onClick={reiniciar}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Reiniciar
      </button>
    </div>
  );
}
