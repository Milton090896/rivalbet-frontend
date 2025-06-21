import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">RivalBet</h1>
      <nav className="space-x-4">
        <Link to="/">Início</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/ludo">Ludo</Link>
        <Link to="/futebol">Futebol</Link>
        <Link to="/dama">Dama</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registrar</Link>
      </nav>
    </header>
  );
}
