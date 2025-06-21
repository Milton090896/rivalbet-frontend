import React, { useState } from "react";
import ListaUsuarios from "../components/ListaUsuarios";

export default function CupomFutebol({ apostas }) {
  const [modo, setModo] = useState(null); // "1v1" ou "torneio"

  return (
    <div className="mt-10 border-t pt-4">
      <h3 className="text-lg font-bold mb-2">Cupom de Apostas</h3>
      {apostas.length === 0 ? (
        <p className="text-gray-500">Nenhum jogo selecionado ainda.</p>
      ) : (
        <ul className="mb-4">
          {apostas.map((ap, idx) => (
            <li key={idx} className="mb-1 text-sm">
              {ap.jogo.casa} vs {ap.jogo.fora} - <strong>{ap.mercado}</strong>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-3 mb-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setModo("1v1")}
        >
          Desafiar 1v1
        </button>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => setModo("torneio")}
        >
          Entrar em Torneio
        </button>
      </div>

      {modo && <ListaUsuarios modo={modo} />}
    </div>
  );
}
