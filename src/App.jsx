import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Futebol from "./pages/Futebol";
import CupomFutebol from "./pages/CupomFutebol";
import DesafioFutebol from "./pages/DesafioFutebol";
import TorneioFutebol from "./pages/TorneioFutebol";
import SelecionarAdversario from "./pages/SelecionarAdversario";

import logo from "./assets/rivalbet-logo.png";

// ✅ Importa o componente de proteção
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Barra de navegação com logo */}
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="RivalBet Logo" className="h-10 w-auto" />
        </Link>

        <div className="space-x-4 text-sm sm:text-base">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/futebol" className="hover:underline">Futebol</Link>
          <Link to="/cupom" className="hover:underline">Cupom</Link>
          <Link to="/desafio" className="hover:underline">Desafio</Link>
          <Link to="/desafiar" className="hover:underline">Desafiar</Link>
          <Link to="/torneio" className="hover:underline">Torneio</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="hover:underline">Entrar</Link>
          <Link to="/register" className="hover:underline">Registrar</Link>
        </div>
      </nav>

      {/* Conteúdo das rotas */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Páginas protegidas por login */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/futebol" element={
            <PrivateRoute>
              <Futebol />
            </PrivateRoute>
          } />
          <Route path="/cupom" element={
            <PrivateRoute>
              <CupomFutebol />
            </PrivateRoute>
          } />
          <Route path="/desafio" element={
            <PrivateRoute>
              <DesafioFutebol />
            </PrivateRoute>
          } />
          <Route path="/desafiar" element={
            <PrivateRoute>
              <SelecionarAdversario />
            </PrivateRoute>
          } />
          <Route path="/torneio" element={
            <PrivateRoute>
              <TorneioFutebol />
            </PrivateRoute>
          } />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
