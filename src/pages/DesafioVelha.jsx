import React, { useState } from "react";
import TicTacToe from "./TicTacToe";

export default function DesafioVelha() {
  const [valorAposta, setValorAposta] = useState("");
  const [user1, setUser1] = useState("User" + Math.floor(1000 + Math.random() * 9000));
  const [user2, setUser2] = useState("User" + Math.floor(1000 + Math.random() * 9000));

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setValorAposta(val);
    }
  };

  const valorLiquido = valorAposta ? (parseFloat(valorAposta) * 2 * 0.9).toFixed(2) : "0.00";

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Desafio 1x1 - Jogo da Velha</h2>

      <p className="mb-2"><strong>Desafiante:</strong> {user1}</p>
      <p className="mb-4"><strong>Adversário:</strong> {user2}</p>

      <label className="block mb-4">
        Valor da Aposta (MZN):
        <input
          type="text"
          value={valorAposta}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      <p className="mb-4">Prêmio total (descontando 10% da casa): <strong>{valorLiquido} MZN</strong></p>

      <TicTacToe />
    </div>
  );
}
