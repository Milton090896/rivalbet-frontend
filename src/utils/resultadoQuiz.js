export function calcularResultadoQuiz({ respostas, questions, modo, aposta, participantes }) {
  const acertos = respostas.reduce(
    (acc, val, i) => (val === questions[i].answer ? acc + 1 : acc),
    0
  );

  const total = aposta * participantes;
  const liquido = total * 0.9;

  let mensagem = "";
  let ganho = 0;

  if (modo === "1x1") {
    if (acertos >= 6) {
      ganho = aposta * 1.8 * 0.9;
      mensagem = `🎉 Vitória! Ganhou ${ganho.toFixed(2)} MZN.`;
    } else if (acertos === 5) {
      ganho = aposta * 0.9;
      mensagem = `🤝 Empate! Recebeu de volta ${ganho.toFixed(2)} MZN.`;
    } else {
      mensagem = `❌ Derrota! Perdeu ${aposta.toFixed(2)} MZN.`;
    }
  } else if (modo === "torneio") {
    if (acertos >= 6) {
      const premioBruto = liquido * 0.7;
      mensagem = `🥇 1º lugar! Ganhou ${premioBruto.toFixed(2)} MZN.`;
      ganho = premioBruto;
    } else if (acertos === 5) {
      const premioBruto = liquido * 0.3;
      mensagem = `🥈 2º lugar! Ganhou ${premioBruto.toFixed(2)} MZN.`;
      ganho = premioBruto;
    } else {
      mensagem = `❌ Você perdeu sua aposta de ${aposta.toFixed(2)} MZN.`;
    }
  }

  return { acertos, mensagem, ganho };
}
