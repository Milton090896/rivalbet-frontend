// src/pages/Partidas.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Partidas = () => {
  const partidasMock = [
    { id: 1, jogo: 'Ludo', valor: 200, status: 'Aguardando jogador' },
    { id: 2, jogo: 'Dama', valor: 500, status: 'Em andamento' },
    { id: 3, jogo: 'Futebol Virtual', valor: 1000, status: 'Aguardando jogador' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Entrar em uma Partida</h2>
      <p className="mb-4 text-gray-600">Veja as partidas disponíveis ou crie uma nova.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partidasMock.map((partida) => (
          <div key={partida.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold">{partida.jogo}</h3>
            <p className="text-sm text-gray-500 mt-1">Aposta: {partida.valor} MZN</p>
            <p className="text-sm mt-1">Status: {partida.status}</p>
            <Link
              to={`/partidas/${partida.id}`}
              className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Entrar
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Criar nova partida</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Criar Partida
        </button>
      </div>
    </div>
  );
};

export default Partidas;