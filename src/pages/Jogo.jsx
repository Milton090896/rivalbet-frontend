// src/pages/Jogo.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Jogo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const voltarInicio = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sala da Partida #{id}</h2>
      <p className="mb-4 text-gray-600">Aqui é onde o jogo vai acontecer.</p>

      <div className="border p-4 rounded shadow mb-6">
        <p><strong>Status:</strong> Aguardando oponente</p>
        <p><strong>Valor apostado:</strong> 500 MZN</p>
        <p><strong>Jogo:</strong> (exemplo) Ludo</p>
      </div>

      <button
        onClick={voltarInicio}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Página Inicial
      </button>
    </div>
  );
};

export default Jogo;
