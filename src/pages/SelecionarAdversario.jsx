import React, { useState, useMemo } from "react";

// 30 jogadores fictícios, 25 online e 5 offline
const jogadoresFicticios = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  nome: `Jogador ${i + 1}`,
  online: i < 25, // primeiros 25 online, últimos 5 offline
}));

export default function SelecionarAdversario() {
  const [valorAposta, setValorAposta] = useState("");
  const [desafiados, setDesafiados] = useState([]);

  // Calcula o ganho líquido com 10% de comissão da casa
  const ganho = useMemo(() => {
    const val = parseFloat(valorAposta);
    if (isNaN(val) || val <= 0) return 0;
    return (val * 2 * 0.9).toFixed(2);
  }, [valorAposta]);

  const toggleDesafiar = (id) => {
    if (!valorAposta || parseFloat(valorAposta) <= 0) {
      alert("Por favor, insira um valor válido de aposta antes de desafiar.");
      return;
    }
    setDesafiados((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Desafiar 1 vs 1</h2>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
        <label className="font-semibold text-lg" htmlFor="valorAposta">
          Valor da aposta (MZN):
        </label>
        <input
          type="number"
          id="valorAposta"
          min="1"
          className="border border-gray-300 rounded px-3 py-2 w-40"
          value={valorAposta}
          onChange={(e) => setValorAposta(e.target.value)}
          placeholder="Ex: 100"
        />
        <div className="font-semibold text-lg text-green-700">
          Possível ganho:{" "}
          <span className="text-green-900">{ganho} MZN</span>
        </div>
      </div>

      <ul className="space-y-3 max-h-[500px] overflow-y-auto">
        {jogadoresFicticios.map((jogador) => {
          const isDesafiado = desafiados.includes(jogador.id);
          return (
            <li
              key={jogador.id}
              className="flex items-center justify-between p-4 rounded shadow bg-white"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${
                    jogador.online ? "bg-green-500" : "bg-red-500"
                  }`}
                  title={jogador.online ? "Online" : "Offline"}
                ></div>
                <span className="font-medium">{jogador.nome}</span>
              </div>

              <button
                disabled={!jogador.online}
                onClick={() => toggleDesafiar(jogador.id)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  isDesafiado
                    ? "bg-pink-200 text-pink-800 cursor-default"
                    : jogador.online
                    ? "bg-green-600 hover:bg-green-800 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isDesafiado ? "Desafiado" : "Desafiar"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
