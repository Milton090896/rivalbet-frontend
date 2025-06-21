import React from 'react';

const Loja = () => {
  const itens = [
    { id: 1, nome: 'Avatar Lendário', preco: 300 },
    { id: 2, nome: 'Tema Noturno Especial', preco: 150 },
    { id: 3, nome: 'Reação Exclusiva (Emoji)', preco: 100 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Loja</h2>
      <p className="mb-4 text-gray-600">Compre itens com mais valor e personalize sua experiência.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {itens.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{item.nome}</h3>
            <p>Preço: {item.preco} moedas Rival</p>
            <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loja;
