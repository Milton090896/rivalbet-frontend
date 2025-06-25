import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa ícones

const jogosFicticios = [
  { id: 1, casa: "Real Madrid", fora: "Manchester City", hora: "18:00" },
  { id: 2, casa: "Bayern de Munique", fora: "Arsenal", hora: "20:00" },
  { id: 3, casa: "Barcelona", fora: "Inter de Milão", hora: "17:30" },
  { id: 4, casa: "PSG", fora: "Juventus", hora: "21:00" },
  { id: 5, casa: "Liverpool", fora: "Atlético de Madrid", hora: "19:45" },
  { id: 6, casa: "Chelsea", fora: "Napoli", hora: "16:30" },
  { id: 7, casa: "AC Milan", fora: "Dortmund", hora: "18:15" },
  { id: 8, casa: "Ajax", fora: "RB Leipzig", hora: "20:45" },
  { id: 9, casa: "Benfica", fora: "Tottenham", hora: "22:00" },
  { id: 10, casa: "Porto", fora: "Roma", hora: "17:00" },
  { id: 11, casa: "Flamengo", fora: "Palmeiras", hora: "15:00" },
  { id: 12, casa: "River Plate", fora: "Boca Juniors", hora: "16:00" },
  { id: 13, casa: "Al Ahly", fora: "Wydad", hora: "14:30" },
  { id: 14, casa: "Sundowns", fora: "Raja Casablanca", hora: "13:45" },
  { id: 15, casa: "Zamalek", fora: "Espérance", hora: "17:30" },
  { id: 16, casa: "TP Mazembe", fora: "Simba SC", hora: "18:00" },
  { id: 17, casa: "Orlando Pirates", fora: "Kaizer Chiefs", hora: "19:00" },
];

const mercadosDisponiveis = [
  "Ambas equipes marcam: Sim",
  "Ambas equipes marcam: Não",
  "Acima de 2.5 gols",
  "Abaixo de 2.5 gols",
  "Vitória da casa",
  "Vitória do visitante",
  "Empate",
  "Acima de 4 cartões amarelos",
  "Abaixo de 4 cartões amarelos",
];

export default function Futebol() {
  const [apostas, setApostas] = useState([]);
  const [jogoSelecionadoId, setJogoSelecionadoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const apostasSalvas = JSON.parse(localStorage.getItem("apostas") || "[]");
    // setApostas(apostasSalvas);
  }, []);

  useEffect(() => {
    localStorage.setItem("apostas", JSON.stringify(apostas));
  }, [apostas]);

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
        <i className="fas fa-futbol text-green-600 mr-2"></i>
        Jogos Fictícios da Champions
      </h2>

      <ul className="space-y-3">
        {jogosFicticios.map((jogo) => {
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
                    {mercadosDisponiveis.map((mercado) => (
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
