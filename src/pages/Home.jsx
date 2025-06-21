// src/pages/Home.jsx
import { Link } from "react-router-dom";
import logo from "../assets/rivalbet-logo.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-800 text-white">
      <img src={logo} alt="RivalBet Logo" className="w-32 mb-6" />
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à RivalBet</h1>

      <div className="flex gap-6">
        <Link to="/login">
          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl text-white text-lg font-semibold">
            Entrar
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white hover:bg-gray-200 px-8 py-3 rounded-xl text-blue-800 text-lg font-semibold">
            Registrar
          </button>
        </Link>
      </div>
    </div>
  );
}
