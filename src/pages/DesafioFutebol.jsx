import React, { useEffect, useState } from "react";

export default function DesafioFutebol() {
  const [desafios, setDesafios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("apostas") || "[]");
    setDesafios(data);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Desafios 1x1</h2>
      {desafios.length === 0 ? (
        <p>Nenhum desafio adicionado.</p>
      ) : (
        <ul className="space-y-3">
          {desafios.map((item, index) => (
            <li key={index} className="border p-3 rounded bg-white">
              <strong>
                {item.jogo.casa} vs {item.jogo.fora}
              </strong>
              <div>Mercado: {item.mercado}</div>
              <div>Status: Aguardando adversário...</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
