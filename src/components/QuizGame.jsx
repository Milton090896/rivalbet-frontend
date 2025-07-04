import React, { useState, useEffect } from "react";
import "./QuizGame.css"; // Importa o estilo atualizado

const sessoes = [
  // Sessão 1
  [
    { pergunta: "Quem venceu a Copa do Mundo de 2022?", opcoes: ["Argentina", "França", "Croácia"], correta: "Argentina" },
    { pergunta: "Artilheiro da Champions 2023/24?", opcoes: ["Haaland", "Mbappé", "Vinícius Jr"], correta: "Mbappé" },
    { pergunta: "Campeão da Copa América 2021?", opcoes: ["Argentina", "Brasil", "Uruguai"], correta: "Argentina" },
    { pergunta: "Clube atual de Jude Bellingham?", opcoes: ["Real Madrid", "Dortmund", "Liverpool"], correta: "Real Madrid" },
    { pergunta: "Quem foi o técnico do Brasil em 2022?", opcoes: ["Tite", "Diniz", "Felipão"], correta: "Tite" },
    { pergunta: "Em qual clube joga o goleiro Ederson?", opcoes: ["Man. City", "Liverpool", "Chelsea"], correta: "Man. City" },
    { pergunta: "Quantas Copas tem o Brasil?", opcoes: ["5", "4", "6"], correta: "5" }, // HISTÓRICA
    { pergunta: "Quem venceu a Champions 2024?", opcoes: ["Real Madrid", "Man. City", "Bayern"], correta: "Real Madrid" },
    { pergunta: "Ano de fundação da FIFA?", opcoes: ["1904", "1912", "1898"], correta: "1904" }, // HISTÓRICA
    { pergunta: "Time apelidado de 'The Reds'?", opcoes: ["Liverpool", "Man. United", "Arsenal"], correta: "Liverpool" },
  ],

  // Sessão 2
  [
    { pergunta: "Quem foi campeão da Euro 2020 (realizada em 2021)?", opcoes: ["Itália", "Inglaterra", "França"], correta: "Itália" },
    { pergunta: "Jogador revelação da Copa 2022?", opcoes: ["Enzo Fernández", "Musiala", "Gavi"], correta: "Enzo Fernández" },
    { pergunta: "Estádio do PSG?", opcoes: ["Parc des Princes", "Stade de France", "Velodrome"], correta: "Parc des Princes" },
    { pergunta: "Time de origem de Erling Haaland?", opcoes: ["Molde", "Salzburg", "Dortmund"], correta: "Molde" },
    { pergunta: "Qual clube brasileiro revelou Vinícius Jr?", opcoes: ["Flamengo", "Santos", "Vasco"], correta: "Flamengo" },
    { pergunta: "Final da Copa do Brasil 2023 foi entre?", opcoes: ["São Paulo e Flamengo", "Palmeiras e Galo", "Inter e Grêmio"], correta: "São Paulo e Flamengo" },
    { pergunta: "Ano da primeira Copa do Mundo?", opcoes: ["1930", "1934", "1928"], correta: "1930" }, // HISTÓRICA
    { pergunta: "Pelé nasceu em que ano?", opcoes: ["1940", "1942", "1939"], correta: "1940" }, // HISTÓRICA
    { pergunta: "Jogador com mais gols na temporada 23/24 na La Liga?", opcoes: ["Bellingham", "Lewandowski", "Griezmann"], correta: "Bellingham" },
    { pergunta: "Campeão da Premier League 2024?", opcoes: ["Man. City", "Arsenal", "Liverpool"], correta: "Arsenal" },
  ],

  // Sessão 3
  [
    { pergunta: "Campeão da Libertadores 2023?", opcoes: ["Fluminense", "Boca Juniors", "Palmeiras"], correta: "Fluminense" },
    { pergunta: "Artilheiro da Copa do Mundo 2022?", opcoes: ["Mbappé", "Messi", "Giroud"], correta: "Mbappé" },
    { pergunta: "Time de Lionel Messi em 2024?", opcoes: ["Inter Miami", "Barcelona", "PSG"], correta: "Inter Miami" },
    { pergunta: "Clube de origem de Rodrygo?", opcoes: ["Santos", "São Paulo", "Flamengo"], correta: "Santos" },
    { pergunta: "Nome do técnico do Real Madrid em 2024?", opcoes: ["Ancelotti", "Zidane", "Xabi Alonso"], correta: "Ancelotti" },
    { pergunta: "Campeão da Champions League 2023?", opcoes: ["Man. City", "Inter", "Real Madrid"], correta: "Man. City" },
    { pergunta: "Qual seleção venceu a Copa de 1998?", opcoes: ["França", "Brasil", "Alemanha"], correta: "França" }, // HISTÓRICA
    { pergunta: "Time que revelou Gabriel Martinelli?", opcoes: ["Ituano", "Corinthians", "Flamengo"], correta: "Ituano" },
    { pergunta: "Maior artilheiro da seleção brasileira?", opcoes: ["Neymar", "Pelé", "Ronaldo"], correta: "Neymar" },
    { pergunta: "Ano da primeira Champions do Chelsea?", opcoes: ["2012", "2010", "2008"], correta: "2012" }, // HISTÓRICA
  ],

  // Sessão 4
  [
    { pergunta: "Clube atual de Endrick em 2024?", opcoes: ["Palmeiras", "Real Madrid", "Barcelona"], correta: "Palmeiras" },
    { pergunta: "Time atual de Cristiano Ronaldo em 2024?", opcoes: ["Al Nassr", "Sporting", "PSG"], correta: "Al Nassr" },
    { pergunta: "Jogador que mais deu assistências na Champions 23/24?", opcoes: ["De Bruyne", "Vinícius Jr", "Griezmann"], correta: "Vinícius Jr" },
    { pergunta: "Técnico do Brasil em 2024?", opcoes: ["Dorival Júnior", "Fernando Diniz", "Tite"], correta: "Dorival Júnior" },
    { pergunta: "Messi venceu quantas Bolas de Ouro?", opcoes: ["8", "7", "9"], correta: "8" },
    { pergunta: "Campeão da Liga Europa 2024?", opcoes: ["Atalanta", "Roma", "Leverkusen"], correta: "Atalanta" },
    { pergunta: "Jogador mais caro da história?", opcoes: ["Neymar", "Mbappé", "Ronaldo"], correta: "Neymar" }, // HISTÓRICA
    { pergunta: "Time de Raphinha em 2024?", opcoes: ["Barcelona", "PSG", "Leeds"], correta: "Barcelona" },
    { pergunta: "Estádio do Atlético de Madrid?", opcoes: ["Metropolitano", "Bernabéu", "Camp Nou"], correta: "Metropolitano" },
    { pergunta: "Time campeão da Copa de 2006?", opcoes: ["Itália", "França", "Alemanha"], correta: "Itália" }, // HISTÓRICA
  ],

  // Sessão 5
  [
    { pergunta: "Jogador eleito melhor do mundo em 2023?", opcoes: ["Messi", "Haaland", "Mbappé"], correta: "Messi" },
    { pergunta: "Campeão da Copa Africana de Nações 2024?", opcoes: ["Costa do Marfim", "Senegal", "Nigéria"], correta: "Costa do Marfim" },
    { pergunta: "Time de Mohamed Salah em 2024?", opcoes: ["Liverpool", "Al-Ittihad", "Roma"], correta: "Liverpool" },
    { pergunta: "Jogador revelação da Libertadores 2023?", opcoes: ["John Kennedy", "André", "Kano"], correta: "John Kennedy" },
    { pergunta: "Estádio do Palmeiras?", opcoes: ["Allianz Parque", "Morumbi", "Pacaembu"], correta: "Allianz Parque" },
    { pergunta: "Neymar se transferiu para qual time em 2023?", opcoes: ["Al-Hilal", "PSG", "Man. City"], correta: "Al-Hilal" },
    { pergunta: "Time campeão da Champions 2005?", opcoes: ["Liverpool", "Milan", "Barcelona"], correta: "Liverpool" }, // HISTÓRICA
    { pergunta: "Ano da estreia de Messi no profissional?", opcoes: ["2004", "2006", "2003"], correta: "2004" }, // HISTÓRICA
    { pergunta: "Campeão da Copa do Mundo Sub-20 em 2023?", opcoes: ["Uruguai", "Itália", "Brasil"], correta: "Uruguai" },
    { pergunta: "Time atual de João Félix?", opcoes: ["Barcelona", "Atleti", "Chelsea"], correta: "Barcelona" },
  ],

  // Sessão 6
  [
    { pergunta: "Time de Kevin De Bruyne em 2024?", opcoes: ["Man. City", "Chelsea", "Arsenal"], correta: "Man. City" },
    { pergunta: "Time que eliminou o Brasil na Copa 2022?", opcoes: ["Croácia", "França", "Argentina"], correta: "Croácia" },
    { pergunta: "Campeão da Ligue 1 2023/24?", opcoes: ["PSG", "Lille", "Monaco"], correta: "PSG" },
    { pergunta: "Jogador que marcou 5 gols em um jogo da Champions 2023?", opcoes: ["Haaland", "Mbappé", "Lewandowski"], correta: "Haaland" },
    { pergunta: "Clube europeu com mais títulos da Champions?", opcoes: ["Real Madrid", "Milan", "Liverpool"], correta: "Real Madrid" }, // HISTÓRICA
    { pergunta: "Time brasileiro campeão da Sul-Americana 2023?", opcoes: ["LDU", "Fortaleza", "São Paulo"], correta: "LDU" },
    { pergunta: "Time atual de Ángel Di María?", opcoes: ["Benfica", "PSG", "Juventus"], correta: "Benfica" },
    { pergunta: "Clube atual de Lucas Paquetá?", opcoes: ["West Ham", "Lyon", "Flamengo"], correta: "West Ham" },
    { pergunta: "Ano em que Cristiano Ronaldo ganhou sua 1ª Bola de Ouro?", opcoes: ["2008", "2007", "2009"], correta: "2008" }, // HISTÓRICA
    { pergunta: "Qual goleiro foi destaque do Aston Villa em 2024?", opcoes: ["Emiliano Martínez", "Alisson", "Ramsdale"], correta: "Emiliano Martínez" },
  ]
];

export default function QuizGame({ modo = "desafio", apostado, participantes, initialBalance, setBalance }) {
  const [sessaoAtual, setSessaoAtual] = React.useState(0);
  const [questaoIndex, setQuestaoIndex] = React.useState(0);
  const [respostas, setRespostas] = React.useState([]);
  const [mostrarResultado, setMostrarResultado] = React.useState(false);
  const [acertos, setAcertos] = React.useState(0);
  const [progresso, setProgresso] = React.useState(100);
  const [saldo, setSaldoInterno] = React.useState(initialBalance ?? 0);
  const [opcaoSelecionada, setOpcaoSelecionada] = React.useState(null);
  const [corBarra, setCorBarra] = React.useState("green");
  const [correcaoEmCurso, setCorrecaoEmCurso] = React.useState(false);
  const [contagemFinal, setContagemFinal] = React.useState(30);

  // Atualiza saldo inicial descontando aposta apenas uma vez no início da sessão:
  React.useEffect(() => {
    if (apostado && saldo === initialBalance) {
      if (saldo >= apostado) {
        setSaldoInterno(saldo - apostado);
        setBalance && setBalance(saldo - apostado);
      } else {
        alert("Saldo insuficiente para apostar!");
        // Aqui você pode mandar o usuário voltar ou bloquear o jogo
      }
    }
  }, [apostado, saldo, initialBalance, setBalance]);

  const questoes = sessoes[sessaoAtual];
  const questaoAtual = questoes[questaoIndex];

  // Timer da pergunta
  React.useEffect(() => {
    if (!mostrarResultado) {
      const timer = setInterval(() => {
        setProgresso((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleNextQuestion();
            return 100;
          }
          return prev - 10;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [questaoIndex, mostrarResultado]);

  React.useEffect(() => {
    if (progresso > 50) setCorBarra("green");
    else if (progresso > 25) setCorBarra("lightblue");
    else if (progresso > 10) setCorBarra("orange");
    else setCorBarra("red");
  }, [progresso]);

  const handleSelecionar = (opcao) => {
    setOpcaoSelecionada(opcao);
    setRespostas((prev) => {
      const novas = [...prev];
      novas[questaoIndex] = opcao;
      return novas;
    });
  };

  const handleNextQuestion = () => {
    setOpcaoSelecionada(null);
    setProgresso(100);

    if (questaoIndex + 1 < questoes.length) {
      setQuestaoIndex((prev) => prev + 1);
    } else {
      setMostrarResultado(true);
      setCorrecaoEmCurso(true);
    }
  };

  // Correção e atualização de saldo
  React.useEffect(() => {
    if (mostrarResultado && correcaoEmCurso) {
      let countAcertos = 0;
      for (let i = 0; i < questoes.length; i++) {
        if (respostas[i] === questoes[i].correta) {
          countAcertos++;
        }
      }
      setAcertos(countAcertos);

      // Calcula ganho
      let ganho = 0;

      if (modo === "desafio") {
        if (countAcertos > 5) {
          ganho = apostado * 2 * 0.9; // Dobro apostado menos 10%
        } else if (countAcertos === 5) {
          ganho = apostado * 0.9; // Empate, retorna 90% da aposta
        } else {
          ganho = 0; // Perdeu
        }
      } else if (modo === "torneio") {
        const premioTotal = apostado * participantes * 0.9;
        if (countAcertos > 5) ganho = premioTotal * 0.7;
        else if (countAcertos === 5) ganho = premioTotal * 0.3;
        else ganho = 0;
      }

      console.log("Modo:", modo);
      console.log("Acertos:", countAcertos);
      console.log("Ganho calculado:", ganho);
      console.log("Saldo antes de atualizar:", saldo);

      // Atualiza saldo final após correção
      const novoSaldo = saldo + ganho;
      setSaldoInterno(novoSaldo);
      setBalance && setBalance(novoSaldo);

      console.log("Saldo atualizado:", novoSaldo);

      // Contagem regressiva de 30 segundos para próxima sessão
      const interval = setInterval(() => {
        setContagemFinal((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setSessaoAtual((sessaoAtual + 1) % sessoes.length);
            setQuestaoIndex(0);
            setRespostas([]);
            setMostrarResultado(false);
            setAcertos(0);
            setProgresso(100);
            setCorrecaoEmCurso(false);
            setContagemFinal(30);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [mostrarResultado, correcaoEmCurso]);

  if (mostrarResultado) {
    let ganho = 0;
    if (modo === "desafio") {
      if (acertos > 5) ganho = apostado * 2 * 0.9;
      else if (acertos === 5) ganho = apostado * 0.9;
      else ganho = 0;
    } else if (modo === "torneio") {
      const premioTotal = apostado * participantes * 0.9;
      if (acertos > 5) ganho = premioTotal * 0.7;
      else if (acertos === 5) ganho = premioTotal * 0.3;
      else ganho = 0;
    }

    return (
      <div className="quiz-box">
        <div className="top-bar">
          <div
            className="progress"
            style={{ width: `${(contagemFinal / 30) * 100}%`, backgroundColor: corBarra }}
          ></div>
        </div>

        <h2>🎉 Resultados</h2>
        <p className={acertos > 5 ? "green" : acertos === 5 ? "yellow" : "red"}>
          {modo === "desafio" ? (
            acertos > 5 ? "🎯 Vitória! Você ganhou a aposta!" :
            acertos === 5 ? "🤝 Empate! Você recebe de volta 90%." :
            "❌ Derrota. Você perdeu sua aposta."
          ) : (
            acertos > 5 ? "🥇 1º lugar no torneio! 70% do prêmio!" :
            acertos === 5 ? "🥈 2º lugar no torneio! 30% do prêmio!" :
            "❌ Fora do pódio. Sem prêmio."
          )}
        </p>
        <p>Você acertou <strong>{acertos}</strong> de <strong>{questoes.length}</strong> questões.</p>
        <p>💰 <strong>Ganho: {ganho.toFixed(2)} MZN</strong></p>
        <p>💼 Saldo atual: <strong>{saldo.toFixed(2)} MZN</strong></p>

        <ul>
          {questoes.map((q, i) => (
            <li key={i} className={respostas[i] === q.correta ? "certa" : "errada"}>
              {i + 1}. {q.pergunta}<br />
              Sua resposta: <strong>{respostas[i] || "Nenhuma"}</strong> | Certa: <strong>{q.correta}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="quiz-box">
      <div className="top-bar">
        <span>Questão {questaoIndex + 1} / {questoes.length}</span>
        <span>Saldo: {saldo.toFixed(2)} MZN</span>
      </div>

      <h2>{questaoAtual.pergunta}</h2>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progresso}%`, backgroundColor: corBarra }}
        ></div>
      </div>

      <div className="opcoes">
        {questaoAtual.opcoes.map((opcao, idx) => (
          <div
            key={idx}
            className={`opcao ${opcaoSelecionada === opcao ? "selecionada" : ""}`}
            onClick={() => handleSelecionar(opcao)}
          >
            {opcao}
            {opcaoSelecionada === opcao && <div className="bola-animada">⚽</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
