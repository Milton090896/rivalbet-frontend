// Função para modo 1x1
export function calcularResultado1x1(apostado, acertos) {
  let ganho = 0;
  let mensagem = "";

  if (acertos <= 4) {
    mensagem = `❌ Você perdeu no modo 1x1.`;
  } else if (acertos === 5) {
    ganho = apostado * 0.9; // devolução com 10% de desconto
    mensagem = `🤝 Empate! Você acertou 5 perguntas.\nRecebeu de volta ${ganho.toFixed(2)} MZN (descontado 10% da casa).`;
  } else {
    ganho = apostado * 1.8; // vitória com lucro de 80%, já com desconto dos 10%
    mensagem = `🎉 Parabéns! Você venceu no modo 1x1 e ganhou ${ganho.toFixed(2)} MZN.`;
  }

  return { ganho, mensagem };
}

// Função para modo torneio
export function calcularResultadoTorneio(apostado, participantes, acertos) {
  const totalPremio = apostado * participantes * 0.9; // 10% da casa
  let ganho = 0;
  let mensagem = "";

  if (acertos <= 4) {
    mensagem = "❌ Você foi eliminado do torneio.";
  } else if (acertos === 5) {
    ganho = totalPremio * 0.3;
    mensagem = `🥈 Você ficou em 2º lugar e ganhou ${ganho.toFixed(2)} MZN!`;
  } else {
    ganho = totalPremio * 0.7;
    mensagem = `🥇 Você ficou em 1º lugar e ganhou ${ganho.toFixed(2)} MZN!`;
  }

  return { ganho, mensagem };
}
