import React, { useState, useEffect, useRef } from "react";
import { FaCoins, FaFutbol } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const FULL_TIME = 30;
const QUESTION_TIME = 10;
const TOTAL_QUESTIONS = 10;
const GAME_DURATION = 100;

const questionsData = [
  { question: "Quem é o maior artilheiro da Champions League?", options: ["Cristiano Ronaldo", "Messi", "Neymar"], answer: 0 },
  { question: "Qual país ganhou a Copa do Mundo em 2018?", options: ["Brasil", "França", "Alemanha"], answer: 1 },
  { question: "Qual jogador tem mais gols em uma única temporada da Premier League?", options: ["Salah", "Alan Shearer", "Thierry Henry"], answer: 1 },
  { question: "Qual clube venceu a final da UEFA Champions League 2023?", options: ["Real Madrid", "Liverpool", "Manchester City"], answer: 2 },
  { question: "Quem venceu a Bola de Ouro 2022?", options: ["Messi", "Modric", "Benzema"], answer: 0 },
  { question: "Qual seleção tem mais títulos da Copa América?", options: ["Argentina", "Uruguai", "Brasil"], answer: 2 },
  { question: "Quem é o goleiro com mais clean sheets na Premier League?", options: ["Petr Čech", "David De Gea", "Ederson"], answer: 0 },
  { question: "Qual país sediou a Copa do Mundo de 2010?", options: ["África do Sul", "Brasil", "Alemanha"], answer: 0 },
  { question: "Quem marcou o gol da vitória da final da Copa do Mundo 2014?", options: ["Mario Götze", "Neymar", "James Rodríguez"], answer: 0 },
  { question: "Qual jogador tem mais assistências na história da Premier League?", options: ["Ryan Giggs", "Cesc Fàbregas", "Thierry Henry"], answer: 0 },
];

function HorizontalTimer({ timeLeft, totalTime }) {
  const percent = (timeLeft / totalTime) * 100;
  let color = "from-green-400 to-lime-500";
  if (percent <= 50 && percent > 25) color = "from-yellow-400 to-orange-500";
  else if (percent <= 25 && percent > 8) color = "from-orange-500 to-red-400";
  else if (percent <= 8) color = "from-red-500 to-red-800";

  return (
    <div className="w-full h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner border border-gray-400">
      <div
        className={`h-full transition-all duration-500 bg-gradient-to-r ${color} shadow-lg`}
        style={{
          width: `${percent}%`,
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.3)",
        }}
      ></div>
    </div>
  );
}

export default function RivalQuiz() {
  // Estados básicos do jogo e seleção
  const [stage, setStage] = useState("selectMode"); // selectMode, configBet, playing, result
  const [mode, setMode] = useState(null); // '1x1' ou 'tournament'
  const [betValue, setBetValue] = useState(100);
  const [tournamentPlayers, setTournamentPlayers] = useState(7);
  const [saldo, setSaldo] = useState(2500);
  const [errorMessage, setErrorMessage] = useState("");

  // Estados do quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null));
  const [questionTime, setQuestionTime] = useState(QUESTION_TIME);
  const [globalTimer, setGlobalTimer] = useState(GAME_DURATION);
  const [showResult, setShowResult] = useState(false);
  const [cooldown, setCooldown] = useState(FULL_TIME);

  // Resultado final e ganhos
  const [finalMessage, setFinalMessage] = useState("");
  const [gainValue, setGainValue] = useState(0);

  // Funções

  function resetGame() {
    setStage("selectMode");
    setMode(null);
    setBetValue(100);
    setTournamentPlayers(7);
    setCurrentQuestion(0);
    setAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setQuestionTime(QUESTION_TIME);
    setGlobalTimer(GAME_DURATION);
    setShowResult(false);
    setCooldown(FULL_TIME);
    setFinalMessage("");
    setGainValue(0);
    setErrorMessage("");
  }

  function handleAnswerSelect(index) {
    if (showResult) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
  }

  const correctCount = answers.reduce((acc, answer, i) => {
    if (answer === questionsData[i].answer) return acc + 1;
    return acc;
  }, 0);

  // Cálculo de ganhos conforme regras
  function calcularResultado() {
    let gain = 0;
    let message = "";

    if (mode === "1x1") {
      if (correctCount > 5) {
        gain = betValue * 1.8 * 0.9;
        message = `🎉 Você ganhou! Ganhou ${gain.toFixed(2)} MZN.`;
        setSaldo((s) => s + gain);
      } else if (correctCount === 5) {
        gain = betValue * 0.9;
        message = `🤝 Empate! Você recupera ${gain.toFixed(2)} MZN (menos 10% da casa).`;
        setSaldo((s) => s - betValue + gain);
      } else {
        gain = 0;
        message = `❌ Você perdeu! Perdeu ${betValue.toFixed(2)} MZN.`;
        setSaldo((s) => s - betValue);
      }
    } else if (mode === "tournament") {
      const totalPool = betValue * tournamentPlayers;
      const poolAfterHouse = totalPool * 0.9;

      if (correctCount > 5) {
        gain = poolAfterHouse * 0.7;
        message = `🎉 1º Lugar! Você ganhou ${gain.toFixed(2)} MZN.`;
        setSaldo((s) => s + gain);
      } else if (correctCount === 5) {
        gain = poolAfterHouse * 0.3;
        message = `🥈 2º Lugar! Você ganhou ${gain.toFixed(2)} MZN.`;
        setSaldo((s) => s + gain);
      } else {
        gain = 0;
        message = `❌ Você perdeu! Perdeu ${betValue.toFixed(2)} MZN.`;
        setSaldo((s) => s - betValue);
      }
    }

    setFinalMessage(message);
    setGainValue(gain);
    setStage("result");
  }

  // Timer global do jogo
  useEffect(() => {
    if (stage !== "playing" || showResult) return;

    const interval = setInterval(() => {
      setGlobalTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setShowResult(true);
          calcularResultado();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, showResult]);

  // Timer da pergunta
  useEffect(() => {
    if (stage !== "playing" || showResult) return;

    const interval = setInterval(() => {
      setQuestionTime((t) => {
        if (t <= 1) {
          if (currentQuestion < TOTAL_QUESTIONS - 1) {
            setCurrentQuestion((q) => q + 1);
            return QUESTION_TIME;
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, stage, showResult]);

  // Cooldown para próximo jogo
  useEffect(() => {
    if (stage !== "result") return;

    const cooldownTimer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownTimer);
          resetGame();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(cooldownTimer);
  }, [stage]);

  // Valores para mostrar ganhos em 1x1 e torneio antes do jogo
  const potentialGain1x1Above5 = betValue * 1.8 * 0.9;
  const potentialGain1x1Tie = betValue * 0.9;

  const totalPoolTournament = betValue * tournamentPlayers;
  const poolAfterHouseTournament = totalPoolTournament * 0.9;
  const potentialGainTournament1 = poolAfterHouseTournament * 0.7;
  const potentialGainTournament2 = poolAfterHouseTournament * 0.3;

  // Função para validar aposta antes de iniciar o jogo
  function iniciarJogo() {
    setErrorMessage(""); // limpa erro anterior

    if (betValue > saldo) {
      setErrorMessage("⚠️ Valor da aposta é maior que o saldo disponível!");
      return;
    }

    if (betValue < 10) {
      setErrorMessage("⚠️ O valor mínimo para apostar é 10 MZN!");
      return;
    }

    if (mode === "tournament" && (tournamentPlayers < 7 || tournamentPlayers > 16)) {
      setErrorMessage("⚠️ Número de jogadores deve estar entre 7 e 16!");
      return;
    }

    // Se passou na validação, inicia o jogo:
    setCurrentQuestion(0);
    setAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setQuestionTime(QUESTION_TIME);
    setGlobalTimer(GAME_DURATION);
    setShowResult(false);
    setStage("playing");
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white bg-opacity-95 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-[6px] border-red-500 font-mono relative perspective-1000 transform-gpu min-h-[600px]">
      {stage === "selectMode" && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Bem-vindo ao RivalQuiz!</h1>
          <p className="text-lg max-w-xl mx-auto">
            Escolha seu modo de jogo e aposte seu saldo fictício para desafiar outros apostadores.
          </p>
          <p className="text-sm max-w-xl mx-auto text-gray-700">
            <strong>Modo 1x1:</strong> Aposte contra um único adversário. Se você acertar mais de 5 questões, ganha 90% do valor apostado pelo adversário. Se empatar com 5, recebe 90% do valor da aposta. Se perder, perde sua aposta.
            <br />
            <strong>Modo Torneio:</strong> Escolha entre 7 e 16 jogadores para competir. Se você terminar em 1º lugar (mais de 5 acertos), ganha 70% do total arrecadado (menos 10% da casa). Se terminar em 2º lugar (exatamente 5 acertos), ganha 30% do total (menos 10% da casa). Caso contrário, perde sua aposta.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={() => { setMode("1x1"); setStage("configBet"); setErrorMessage(""); }}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
            >
              Modo 1x1
            </button>
            <button
              onClick={() => { setMode("tournament"); setStage("configBet"); setErrorMessage(""); }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
            >
              Modo Torneio
            </button>
          </div>
          <div className="mt-8 text-lg">
            Saldo atual: <span className="font-bold text-yellow-600">{saldo.toFixed(2)} MZN</span>
          </div>
        </div>
      )}

      {stage === "configBet" && (
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
            {mode === "1x1" ? "Configurar Aposta - Modo 1x1" : "Configurar Aposta - Modo Torneio"}
          </h2>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="betValue">
              Valor da aposta (mínimo 10 MZN)
            </label>
            <input
              id="betValue"
              type="number"
              min="10"
              max={saldo}
              value={betValue}
              onChange={(e) => setBetValue(Math.min(Math.max(10, Number(e.target.value)), saldo))}
              className="w-full border border-gray-400 rounded px-3 py-2 text-lg"
            />
          </div>
          {mode === "tournament" && (
            <div>
              <label className="block mb-2 font-semibold" htmlFor="tournamentPlayers">
                Número de jogadores (7 a 16)
              </label>
              <input
                id="tournamentPlayers"
                type="number"
                min="7"
                max="16"
                value={tournamentPlayers}
                onChange={(e) => setTournamentPlayers(Math.min(Math.max(7, Number(e.target.value)), 16))}
                className="w-full border border-gray-400 rounded px-3 py-2 text-lg"
              />
            </div>
          )}

          {errorMessage && (
            <div className="text-red-700 font-semibold text-center mt-2">{errorMessage}</div>
          )}

          <div className="mt-4 text-center text-lg font-semibold">
            {mode === "1x1" ? (
              <>
                <p>Potencial ganho se vencer: <span className="text-green-600">{(betValue * 1.8 * 0.9).toFixed(2)} MZN</span></p>
                <p>Potencial ganho em empate: <span className="text-yellow-600">{(betValue * 0.9).toFixed(2)} MZN</span></p>
              </>
            ) : (
              <>
                <p>Potencial prêmio 1º lugar: <span className="text-green-600">{(totalPoolTournament * 0.9 * 0.7).toFixed(2)} MZN</span></p>
                <p>Potencial prêmio 2º lugar: <span className="text-yellow-600">{(totalPoolTournament * 0.9 * 0.3).toFixed(2)} MZN</span></p>
                <p>Prêmio baseado em {tournamentPlayers} jogadores apostando {betValue.toFixed(2)} MZN</p>
              </>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => { setStage("selectMode"); setErrorMessage(""); }}
              className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-100 transition"
            >
              Voltar
            </button>
            <button
              onClick={iniciarJogo}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-bold transition transform hover:scale-105"
            >
              Iniciar jogo
            </button>
          </div>
          <div className="mt-6 text-lg">
            Saldo atual: <span className="font-bold text-yellow-600">{saldo.toFixed(2)} MZN</span>
          </div>
        </div>
      )}

      {stage === "playing" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaCoins className="text-yellow-500 text-3xl animate-pulse" />
              <FaFutbol className="text-black text-3xl animate-bounce" />
              <span className="text-lg font-bold text-gray-800">
                Tempo restante: {globalTimer}s
              </span>
            </div>
            <div className="text-lg font-semibold">
              Saldo: <span className="text-yellow-600">{saldo.toFixed(2)} MZN</span>
            </div>
          </div>

          <HorizontalTimer timeLeft={globalTimer} totalTime={GAME_DURATION} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h2 className="text-xl font-bold mb-4 text-red-600 drop-shadow-lg">
                {questionsData[currentQuestion].question}
              </h2>
              <div className="grid gap-4">
                {questionsData[currentQuestion].options.map((opt, idx) => {
                  const selected = answers[currentQuestion] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all duration-200 ease-in-out text-lg font-semibold shadow-lg transform-gpu hover:scale-105 active:scale-95
                      ${selected ? "bg-red-400 text-white border-red-600" : "bg-blue-200 border-blue-400 hover:bg-blue-300"}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Pergunta {currentQuestion + 1} de {TOTAL_QUESTIONS} | Tempo: {questionTime}s
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {stage === "result" && (
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-700 drop-shadow">
            {finalMessage}
          </h2>
          <p className="mb-4 text-lg font-semibold">
            Acertou {correctCount} de {TOTAL_QUESTIONS} perguntas.
          </p>
          <p className="mb-8 text-yellow-700 font-bold">
            Saldo atualizado: {saldo.toFixed(2)} MZN
          </p>
          <button
            onClick={() => resetGame()}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md font-bold transition transform hover:scale-105"
          >
            Jogar novamente
          </button>
          <p className="mt-6 text-gray-600 text-sm">
            Próximo jogo inicia em {cooldown}s...
          </p>
        </div>
      )}
    </div>
  );
}
