import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";

export default function ProcessandoTorneio() {
  const location = useLocation();
  // Recebe os jogos passados pelo navigate
  const jogosSelecionados = location.state?.jogosSelecionados || [];

  const [contador, setContador] = useState(5);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => setContador(contador - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setFinalizado(true);
    }
  }, [contador]);

  if (!finalizado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Processando torneio... {contador}
        </h2>
        <p className="text-gray-600">Aguardando a aceitação de outros apostadores.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4 max-w-xl mx-auto">
      <CheckCircle className="h-14 w-14 text-green-500 mb-4" />
      <h2 className="text-xl font-bold text-green-600 mb-4">
        Desafio de torneio enviado com sucesso!
      </h2>
      <p className="text-gray-700 mb-6">Aguarde a confirmação dos desafiados.</p>

      {jogosSelecionados.length > 0 && (
        <div className="w-full bg-white rounded shadow p-4 text-left">
          <h3 className="font-semibold text-lg mb-2">Jogos Selecionados:</h3>
          <ul className="list-disc list-inside max-h-60 overflow-y-auto">
            {jogosSelecionados.map((jogo, index) => (
              <li key={index} className="mb-1">
                <strong>{jogo.timeCasa}</strong> vs <strong>{jogo.timeFora}</strong> — {jogo.tipoAposta}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
