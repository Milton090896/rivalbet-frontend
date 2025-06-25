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
import ProcessandoTorneio from "./pages/ProcessandoTorneio";
import SelecionarAdversario from "./pages/SelecionarAdversario";

// Importações do Basquete e Voleibol
import Basquete from "./pages/Basquete";
import Voleibol from "./pages/Voleibol";

import logo from "./assets/rivalbet-logo.png";

// Componente de rota protegida
import PrivateRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Barra de navegação */}
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="RivalBet Logo" className="h-10 w-auto" />
        </Link>

        <div className="space-x-4 text-sm sm:text-base">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/futebol" className="hover:underline">Futebol</Link>
          <Link to="/basquete" className="hover:underline">Basquetebol</Link>
          <Link to="/voleibol" className="hover:underline">Voleibol</Link>
          <Link to="/cupom" className="hover:underline">Cupom</Link>
          <Link to="/desafio" className="hover:underline">Desafio</Link>
          <Link to="/desafiar" className="hover:underline">Desafiar</Link>
          <Link to="/torneio" className="hover:underline">Torneio</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="hover:underline">Entrar</Link>
          <Link to="/register" className="hover:underline">Registrar</Link>
        </div>
      </nav>

      {/* Rotas */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/futebol"
            element={
              <PrivateRoute>
                <Futebol />
              </PrivateRoute>
            }
          />
          <Route
            path="/basquete"
            element={
              <PrivateRoute>
                <Basquete />
              </PrivateRoute>
            }
          />
          <Route
            path="/voleibol"
            element={
              <PrivateRoute>
                <Voleibol />
              </PrivateRoute>
            }
          />
          <Route
            path="/cupom"
            element={
              <PrivateRoute>
                <CupomFutebol />
              </PrivateRoute>
            }
          />
          <Route
            path="/desafio"
            element={
              <PrivateRoute>
                <DesafioFutebol />
              </PrivateRoute>
            }
          />
          <Route
            path="/desafiar"
            element={
              <PrivateRoute>
                <SelecionarAdversario />
              </PrivateRoute>
            }
          />
          <Route
            path="/torneio"
            element={
              <PrivateRoute>
                <TorneioFutebol />
              </PrivateRoute>
            }
          />
          <Route
            path="/torneio/processando"
            element={
              <PrivateRoute>
                <ProcessandoTorneio />
              </PrivateRoute>
            }
          />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
