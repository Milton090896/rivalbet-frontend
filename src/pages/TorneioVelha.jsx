import React, { useState } from "react";
import TicTacToe from "./TicTacToe";

export default function TorneioVelha() {
  const [numJogadores, setNumJogadores] = useState("");
  const [valorAposta, setValorAposta] = useState("");
  const [mensagem, setMensagem] = useState("");

  const minJogos = 10;

  const calcularPremios = () => {
    const n = parseInt(numJogadores);
    const v = parseFloat(valorAposta);
    if (isNaN(n) || isNaN(v) || n < minJogos || v <= 0) {
      return { total: 0, primeiro: 0, segundo: 0 };
    }
    const total = n * v;
    const liquido = total * 0.9;
    return {
      total: liquido.toFixed(2),
      primeiro: (liquido * 0.7).toFixed(2),
      segundo: (liquido * 0.3).toFixed(2),
    };
  };

  const premios = calcularPremios();

  const handleJogadores = (e) => {
    const val = e.target.value;
    setNumJogadores(val);
    if (val && parseInt(val) < minJogos) {
      setMensagem("⚠️ O número de jogadores está abaixo do mínimo permitido (10).");
    } else {
      setMensagem("");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Torneio - Jogo da Velha</h2>

      <label className="block mb-2 font-semibold">
        Número de Jogadores:
        <input
          type="text"
          value={numJogadores}
          onChange={handleJogadores}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-4 font-semibold">
        Valor da Aposta (por jogador):
        <input
          type="text"
          value={valorAposta}
          onChange={(e) => setValorAposta(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {mensagem && <p className="text-red-600 mb-4">{mensagem}</p>}

      <div className="bg-gray-100 p-3 rounded mb-4">
        <p>Total Líquido: <strong>{premios.total} MZN</strong></p>
        <p>1º lugar (70%): <strong>{premios.primeiro} MZN</strong></p>
        <p>2º lugar (30%): <strong>{premios.segundo} MZN</strong></p>
      </div>

      {!mensagem && <TicTacToe />}
    </div>
  );
}
