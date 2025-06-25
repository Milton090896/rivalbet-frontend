import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const jogosFicticiosVolei = [
  { id: 1, casa: "Brasil", fora: "Itália", hora: "15:00" },
  { id: 2, casa: "Polônia", fora: "França", hora: "16:30" },
  { id: 3, casa: "EUA", fora: "Rússia", hora: "17:45" },
  { id: 4, casa: "Japão", fora: "Irã", hora: "19:00" },
  { id: 5, casa: "Canadá", fora: "Argentina", hora: "20:15" },
  { id: 6, casa: "Cuba", fora: "Alemanha", hora: "21:30" },
  { id: 7, casa: "Sérvia", fora: "Eslovênia", hora: "22:45" },
];

const mercadosVolei = [
  "Vitória da casa",
  "Vitória do visitante",
  "Vitória no 1º set - casa",
  "Vitória no 1º set - visitante",
  "Mais de 180 pontos",
  "Menos de 180 pontos",
  "Vitória no tie-break",
];

export default function Voleibol() {
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
      <h2 className="text-2xl font-bold mb-4">Jogos Fictícios de Voleibol</h2>

      <ul className="space-y-3">
        {jogosFicticiosVolei.map((jogo) => {
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
                    {mercadosVolei.map((mercado) => (
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
