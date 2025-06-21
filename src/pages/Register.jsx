import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        alert("⚠️ Este e-mail já tem uma conta na RivalBet.");
      } else {
        alert("Erro ao registrar: " + error.message);
      }
    } else {
      alert("✅ Registrado com sucesso! Fazendo login automático...");

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        alert("Erro ao fazer login automático: " + loginError.message);
      } else {
        navigate("/futebol");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-6">Registrar</h2>
      <input
        type="email"
        placeholder="Seu e-mail"
        className="border mb-4 p-2 rounded w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Palavra-passe"
        className="border mb-4 p-2 rounded w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
