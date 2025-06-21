import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        alert("⚠️ Este e-mail já tem uma conta na RivalBet.");
      } else {
        alert("Erro ao registrar: " + error.message);
      }
    } else {
      // Salvar simulação de login local
      localStorage.setItem("user", email);
      alert("✅ Registro feito com sucesso!");
      navigate("/futebol"); // ou dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-6">Registrar</h2>
      <input
        type="text"
        placeholder="Seu e-mail ou número de telefone"
        className="border mb-4 p-2 rounded w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Palavra-passe"
        className="border mb-4 p-2 rounded w-72"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-blue-700 text-white px-6 py-2 rounded"
      >
        Registrar
      </button>
    </div>
  );
}
