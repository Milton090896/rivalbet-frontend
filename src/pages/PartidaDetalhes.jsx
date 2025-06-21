import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PartidaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const confirmarEntrada = () => {
    alert(`Você entrou na partida ${id} com sucesso!`);
    navigate(`/jogo/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detalhes da Partida #{id}</h2>
      <p className="mb-4 text-gray-600">
        Aqui você pode ver os detalhes da partida antes de confirmar.
      </p>

      <div className="border p-4 rounded shadow mb-6">
        <p><strong>Tipo:</strong> Jogo aleatório (Ludo, Dama, etc.)</p>
        <p><strong>Status:</strong> Aguardando oponente</p>
        <p><strong>Valor apostado:</strong> 500 MZN</p>
      </div>

      <button
        onClick={confirmarEntrada}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Confirmar Entrada
      </button>
    </div>
  );
};

export default PartidaDetalhes;