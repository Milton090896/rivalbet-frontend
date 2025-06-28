import React, { useState, useEffect } from "react";
import { FaCoins, FaFutbol } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 10;
const TOTAL_GAME_TIME = 100;
const TIME_BETWEEN_GAMES = 30;

const questions = [
  { question: "Quem venceu a Copa do Mundo de 2018?", options: ["Brasil", "França", "Alemanha"], answer: 1 },
  { question: "Quem é o maior artilheiro da Champions League?", options: ["Cristiano Ronaldo", "Messi", "Neymar"], answer: 0 },
  { question: "Qual clube venceu a Champions 2023?", options: ["Real Madrid", "Liverpool", "Man City"], answer: 2 },
  { question: "Quem ganhou a Bola de Ouro 2022?", options: ["Messi", "Modric", "Benzema"], answer: 2 },
  { question: "País sede da Copa 2010?", options: ["Brasil", "África do Sul", "Alemanha"], answer: 1 },
  { question: "Goleiro com mais clean sheets?", options: ["Cech", "De Gea", "Ederson"], answer: 0 },
  { question: "Gol da final de 2014?", options: ["Mario Götze", "Neymar", "James"], answer: 0 },
  { question: "País com mais Copas América?", options: ["Brasil", "Uruguai", "Argentina"], answer: 2 },
  { question: "Mais assistências na Premier League?", options: ["Fàbregas", "Henry", "Giggs"], answer: 2 },
  { question: "Maior artilheiro Premier por temporada?", options: ["Shearer", "Salah", "Henry"], answer: 0 },
];

function BarraDeTempo({ tempo }) {
  const percent = (tempo / TOTAL_GAME_TIME) * 100;
  let color = "from-green-400 to-green-600";
  if (percent <= 50 && percent > 25) color = "from-blue-400 to-blue-600";
  else if (percent <= 25 && percent > 8) color = "from-orange-400 to-orange-600";
  else if (percent <= 8) color = "from-red-500 to-red-700";

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 bg-gradient-to-r ${color}`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default function RivalQuiz() {
  const [saldo, setSaldo] = useState(2500);
  const [apostado, setApostado] = useState("");
  const [respostas, setRespostas] = useState(Array(TOTAL_QUESTIONS).fill(null));
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tempo, setTempo] = useState(TOTAL_GAME_TIME);
  const [modo, setModo] = useState("1x1");
  const [participantes, setParticipantes] = useState(10);
  const [emJogo, setEmJogo] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [tempoResultado, setTempoResultado] = useState(TIME_BETWEEN_GAMES);
  const [mensagem, setMensagem] = useState("");
  const [corretas, setCorretas] = useState(0);

  // Use useRef para armazenar valor da aposta ao iniciar jogo, para garantir consistência
  const [apostadoNoJogo, setApostadoNoJogo] = useState(0);

  useEffect(() => {
    if (!emJogo || mostrarResultado) return;
    const interval = setInterval(() => {
      setTempo((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          calcularResultado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [emJogo, mostrarResultado]);

  useEffect(() => {
    if (mostrarResultado) {
      const interval = setInterval(() => {
        setTempoResultado((t) => {
          if (t <= 1) {
            clearInterval(interval);
            if (saldo >= apostadoNoJogo) iniciarNovoJogo();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (tempo > 0 && tempo % TIME_PER_QUESTION === 0 && indicePergunta < TOTAL_QUESTIONS - 1) {
      setIndicePergunta((i) => i + 1);
    }
  }, [tempo]);

  function selecionarResposta(index) {
    const novas = [...respostas];
    novas[indicePergunta] = index;
    setRespostas(novas);
  }

  function iniciarPrimeiroJogo() {
    const aposta = Number(apostado);
    if (aposta >= 10 && aposta <= saldo) {
      setSaldo((prev) => prev - aposta);
      setApostadoNoJogo(aposta);
      setEmJogo(true);
      setMostrarResultado(false);
      setTempo(TOTAL_GAME_TIME);
      setIndicePergunta(0);
      setRespostas(Array(TOTAL_QUESTIONS).fill(null));
      setMensagem("");
      setTempoResultado(TIME_BETWEEN_GAMES);
      setCorretas(0);
    } else {
      alert("Valor de aposta inválido ou saldo insuficiente.");
    }
  }

  function calcularResultado() {
    const acertos = respostas.reduce(
      (acc, val, i) => (val === questions[i].answer ? acc + 1 : acc),
      0
    );
    setCorretas(acertos);
    let ganho = 0;
    const aposta = apostadoNoJogo;

    if (modo === "1x1") {
      if (acertos > 5) {
        ganho = aposta * 1.8 * 0.9;
        setMensagem(`🎉 Você venceu e ganhou ${ganho.toFixed(2)} MZN!`);
      } else if (acertos === 5) {
        ganho = aposta * 0.9;
        setMensagem(`🤝 Empate! Você recuperou ${ganho.toFixed(2)} MZN.`);
      } else {
        ganho = 0;
        setMensagem(`❌ Você perdeu sua aposta de ${aposta.toFixed(2)} MZN.`);
      }
    } else if (modo === "torneio") {
      const total = aposta * participantes;
      const liquido = total * 0.9;
      if (acertos > 5) {
        ganho = liquido * 0.7;
        setMensagem(`🥇 1º lugar! Ganhou ${ganho.toFixed(2)} MZN.`);
      } else if (acertos === 5) {
        ganho = liquido * 0.3;
        setMensagem(`🥈 2º lugar! Ganhou ${ganho.toFixed(2)} MZN.`);
      } else {
        ganho = 0;
        setMensagem(`❌ Você perdeu sua aposta.`);
      }
    }

    if (ganho > 0) {
      setSaldo((prev) => prev + ganho);
    }
    setMostrarResultado(true);
    setEmJogo(false);
  }

  function iniciarNovoJogo() {
    setEmJogo(false);
    setMostrarResultado(false);
    setMensagem("");
    setTempoResultado(TIME_BETWEEN_GAMES);
    setRespostas(Array(TOTAL_QUESTIONS).fill(null));
    setIndicePergunta(0);
    setTempo(TOTAL_GAME_TIME);
    setCorretas(0);
    setApostado("");
  }

  if (!emJogo && !mostrarResultado) {
    return (
      <div className="text-center mt-20 space-y-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao RivalQuiz</h1>
        <p className="text-gray-700">Saldo atual: {saldo.toFixed(2)} MZN</p>

        <div className="space-y-2">
          <input
            type="number"
            min={10}
            max={saldo}
            value={apostado}
            onChange={(e) => setApostado(e.target.value)}
            className="border-2 border-gray-400 rounded-lg px-4 py-2 w-48 text-center font-bold"
            placeholder="Digite valor da aposta"
          />
          <p className="text-sm text-gray-500">
            Valor mínimo: 10 MZN | Máximo: {saldo.toFixed(2)} MZN
          </p>
        </div>

        <button
          disabled={Number(apostado) < 10 || Number(apostado) > saldo || apostado === ""}
          onClick={iniciarPrimeiroJogo}
          className={`px-6 py-3 rounded-lg text-white font-semibold ${
            Number(apostado) < 10 || Number(apostado) > saldo || apostado === ""
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Iniciar Jogo por {apostado ? Number(apostado).toFixed(2) : "0"} MZN
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border-4 border-red-500 font-mono">
      {!mostrarResultado && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaFutbol className="text-black animate-bounce text-xl" />
              <FaCoins className="text-yellow-500 animate-ping text-xl" />
              <span className="font-bold text-gray-700">Tempo: {tempo}s</span>
            </div>
            <div className="font-bold text-yellow-700">
              Saldo: {saldo.toFixed(2)} MZN
            </div>
          </div>

          <BarraDeTempo tempo={tempo} />

          <AnimatePresence mode="wait">
            <motion.div
              key={indicePergunta}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <h2 className="text-xl font-bold mb-4 text-red-700">
                {questions[indicePergunta].question}
              </h2>
              <div className="grid gap-4">
                {questions[indicePergunta].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => selecionarResposta(idx)}
                    className={`py-3 px-4 rounded-xl border-2 text-lg font-semibold shadow-sm ${
                      respostas[indicePergunta] === idx
                        ? "bg-red-500 text-white border-red-700"
                        : "bg-blue-100 border-blue-300 hover:bg-blue-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Pergunta {indicePergunta + 1} de {TOTAL_QUESTIONS}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {mostrarResultado && (
        <div className="text-center space-y-6 mt-6">
          <h2 className="text-2xl font-bold text-green-700">{mensagem}</h2>
          <p>Saldo atual: {saldo.toFixed(2)} MZN</p>
          <p className="text-sm text-gray-500">
            Próximo jogo em {tempoResultado}s...
          </p>

          <div className="text-left mt-6 border-t pt-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Correção:</h3>
            {questions.map((q, idx) => (
              <div
                key={idx}
                className={`mb-2 p-3 rounded-lg ${
                  respostas[idx] === q.answer ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="font-semibold">
                  {idx + 1}. {q.question}
                </p>
                <p>
                  Sua resposta:{" "}
                  <strong>
                    {respostas[idx] !== null
                      ? q.options[respostas[idx]]
                      : "Não respondeu"}
                  </strong>
                </p>
                <p>
                  Resposta correta: <strong>{q.options[q.answer]}</strong>
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setMostrarResultado(false)}
            className="px-6 py-2 mt-4 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
