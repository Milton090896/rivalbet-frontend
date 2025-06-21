import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    let response;

    if (input.includes("@")) {
      response = await supabase.auth.signInWithPassword({
        email: input,
        password: password,
      });
    } else {
      response = await supabase.auth.signInWithPassword({
        phone: input,
        password: password,
      });
    }

    const { data, error } = response;

    if (error) {
      console.log("Erro:", error.message);
      setErrorMsg("E-mail ou palavra passe incorreto.");
    } else {
      // Salvar usuário localmente (simulação para rotas protegidas)
      localStorage.setItem("user", input);
      navigate("/futebol"); // ou dashboard
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Entrar no RivalBet</h2>
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Seu e-mail ou telefone"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Palavra passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
