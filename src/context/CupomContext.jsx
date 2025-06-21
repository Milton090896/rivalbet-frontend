import { createContext, useContext, useState } from "react";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupom, setCupom] = useState([]);

  const adicionarAoCupom = (jogo, tipo) => {
    const jaExiste = cupom.find((item) => item.id === jogo.id);

    if (cupom.length >= 5 && !jaExiste) {
      alert("Você atingiu o limite de 5 jogos.");
      return;
    }

    const atualizado = jaExiste
      ? cupom.map((item) =>
          item.id === jogo.id ? { ...item, tipo } : item
        )
      : [...cupom, { ...jogo, tipo }];

    setCupom(atualizado);
  };

  const removerDoCupom = (id) => {
    setCupom(cupom.filter((item) => item.id !== id));
  };

  return (
    <CupomContext.Provider value={{ cupom, adicionarAoCupom, removerDoCupom }}>
      {children}
    </CupomContext.Provider>
  );
}

export function useCupom() {
  return useContext(CupomContext);
}
