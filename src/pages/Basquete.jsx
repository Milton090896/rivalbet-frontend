import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa ícones

const jogosFicticiosBasquete = [
  { id: 1, casa: "Lakers", fora: "Warriors", hora: "19:00" },
  { id: 2, casa: "Bucks", fora: "Nets", hora: "20:30" },
  { id: 3, casa: "Heat", fora: "Celtics", hora: "18:00" },
  { id: 4, casa: "Clippers", fora: "Suns", hora: "21:00" },
  { id: 5, casa: "Jazz", fora: "Raptors", hora: "19:45" },
  { id: 6, casa: "76ers", fora: "Nuggets", hora: "17:30" },
];

const mercadosDisponiveisBasquete = [
  "Vencedor da partida",
  "Vencedor do 1º quarto",
  "Vencedor do 2º quarto",
  "Vencedor do 3º quarto",
  "Vencedor do 4º quarto",
  "Total acima de 210.5 pontos",
  "Total abaixo de 210.5 pontos",
];

export default function Basquete() {
  const [apostas, setApostas] = useState([]);
  const [jogoSelecionadoId, setJogoSelecionadoId] = useState(null);
  const navigate = useNavigate();

  const selecionarJogo = (jogo) => {
    if (apostas.length >= 10 && !apostas.find((a) => a.jogo.id === jogo.id)) {
      alert("Você atingiu o limite de 10 jogos.");
      return;
    }
    setJogoSelecionadoId(jogo.id === jogoSelecionadoId ? null : jogo.id);
  };

  const selecionarMercado = (jogo, mercado) => {
    const novaAposta = { jogo, mercado };
    const outras = apostas.filter((a) => a.jogo.id !== jogo.id);
    setApostas([...outras, novaAposta]);
    setJogoSelecionadoId(null);
  };

  const isSelecionado = (jogoId) =>
    apostas.find((a) => a.jogo.id === jogoId);

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <i className="fas fa-basketball-ball text-orange-600 mr-2"></i>
        Jogos Fictícios de Basquetebol
      </h2>

      <ul className="space-y-3">
        {jogosFicticiosBasquete.map((jogo) => {
          const selecionado = isSelecionado(jogo.id);
          return (
            <li
              key={jogo.id}
              onClick={() => selecionarJogo(jogo)}
              className={`p-4 rounded cursor-pointer shadow border ${
                selecionado ? "bg-pink-100 border-pink-400" : "bg-white"
              }`}
            >
              <div className="text-blue-900 font-semibold">
                {jogo.casa} vs {jogo.fora} - {jogo.hora}
              </div>

              {selecionado && (
                <div className="text-sm mt-1 text-gray-700">
                  Aposta: <strong>{selecionado.mercado}</strong>
                </div>
              )}

              {jogoSelecionadoId === jogo.id && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Escolher mercado:</div>
                  <div className="flex flex-wrap gap-2">
                    {mercadosDisponiveisBasquete.map((mercado) => (
                      <button
                        key={mercado}
                        className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          selecionarMercado(jogo, mercado);
                        }}
                      >
                        {mercado}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Seu Cupom</h3>
        {apostas.length === 0 ? (
          <p className="text-gray-500">Nenhum jogo selecionado ainda.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {apostas.map((a, idx) => (
                <li key={idx} className="bg-gray-100 p-3 rounded">
                  {a.jogo.casa} vs {a.jogo.fora} —{" "}
                  <strong>{a.mercado}</strong>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigate("/desafiar")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Desafiar 1 vs 1
              </button>
              <button
                onClick={() => navigate("/torneio")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                Entrar em Torneio
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
