import React from "react";

const usuarios = Array.from({ length: 30 }, (_, i) => ({
  nome: `user${String(i + 1).padStart(3, "0")}@go`,
  online: i < 25, // últimos 5 offline
}));

export default function ListaUsuarios({ modo }) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h4 className="font-semibold mb-3">Jogadores Disponíveis</h4>
      <ul className="space-y-2">
        {usuarios.map((user, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-white p-2 rounded shadow"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  user.online ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className={`text-sm ${user.online ? "" : "text-gray-400"}`}>
                {user.nome}
              </span>
            </div>
            <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">
              {modo === "1v1" ? "Desafiar" : "Convidar a torneio"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
