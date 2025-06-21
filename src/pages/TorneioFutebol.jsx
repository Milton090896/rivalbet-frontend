import React, { useState } from "react";

export default function TorneioFutebol() {
  const [numJogadores, setNumJogadores] = useState("");
  const [valorAposta, setValorAposta] = useState("");
  const [mensagemAviso, setMensagemAviso] = useState("");
  const [mensagemErroJogo, setMensagemErroJogo] = useState("");

  const limiteMin = 7;
  const limiteMax = 16;
  const jogosMinimos = 10;
  const taxaCasa = 0.10;

  const validarNumJogadores = (num) => {
    if (num === "") return "";
    if (num < limiteMin) return `Número muito baixo. Mínimo recomendado: ${limiteMin}`;
    if (num > limiteMax) return `Número excedeu o limite máximo: ${limiteMax}`;
    return "";
  };

  const calcularPremios = () => {
    const n = parseInt(numJogadores, 10);
    const v = parseFloat(valorAposta);

    if (isNaN(n) || isNaN(v) || n < limiteMin || n > limiteMax || v <= 0) {
      return { primeiro: 0, segundo: 0, totalLiquido: 0 };
    }

    const totalApostado = n * v;
    const comissaoCasa = totalApostado * taxaCasa;
    const premioLiquido = totalApostado - comissaoCasa;

    return {
      totalLiquido: premioLiquido.toFixed(2),
      primeiro: (premioLiquido * 0.7).toFixed(2),
      segundo: (premioLiquido * 0.3).toFixed(2),
    };
  };

  const premios = calcularPremios();

  const handleNumJogadoresChange = (e) => {
    const val = e.target.value;
    if (val === "" || (/^\d+$/.test(val) && val.length <= 2)) {
      setNumJogadores(val);
      setMensagemAviso(validarNumJogadores(parseInt(val, 10)));
      setMensagemErroJogo(""); // limpa erro se alterar
    }
  };

  const handleValorApostaChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setValorAposta(val);
    }
  };

  const handleEntrarTorneio = () => {
    const num = parseInt(numJogadores, 10);
    if (isNaN(num) || num < jogosMinimos) {
      setMensagemErroJogo("⚠️ O número de jogos selecionados está abaixo do mínimo autorizado para torneios (mínimo: 10 jogos).");
    } else {
      setMensagemErroJogo("");
      alert("✅ Entrada no torneio registrada com sucesso!");
    }
  };

  const botaoDesabilitado =
    !numJogadores ||
    !valorAposta ||
    mensagemAviso ||
    parseInt(numJogadores, 10) < limiteMin ||
    parseInt(numJogadores, 10) > limiteMax ||
    parseFloat(valorAposta) <= 0;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Entrar em Torneio</h2>

      <label className="block mb-2 font-semibold">
        Número de Jogadores (7 a 16):
        <input
          type="text"
          value={numJogadores}
          onChange={handleNumJogadoresChange}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Digite o número de jogadores"
        />
      </label>
      {mensagemAviso && (
        <p className="text-sm text-red-600 mb-2">{mensagemAviso}</p>
      )}

      <label className="block mb-2 font-semibold">
        Valor da Aposta por Jogador:
        <input
          type="text"
          value={valorAposta}
          onChange={handleValorApostaChange}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Digite o valor da aposta"
        />
      </label>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Potenciais Prêmios</h3>
        <p>Total Líquido (descontando 10% da casa): <strong>{premios.totalLiquido} MZN</strong></p>
        <p>1º Lugar (70% do total líquido): <strong>{premios.primeiro} MZN</strong></p>
        <p>2º Lugar (30% do total líquido): <strong>{premios.segundo} MZN</strong></p>
      </div>

      {mensagemErroJogo && (
        <p className="text-sm text-red-600 mt-2">{mensagemErroJogo}</p>
      )}

      <button
        onClick={handleEntrarTorneio}
        disabled={botaoDesabilitado}
        className={`mt-6 w-full py-2 rounded text-white font-bold ${
          botaoDesabilitado
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Entrar no Torneio
      </button>
    </div>
  );
}
