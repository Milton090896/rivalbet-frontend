const BASE_URL = "https://v3.football.api-sports.io";

// Função para buscar os jogos de hoje
export async function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(`${BASE_URL}/fixtures?date=${today}`, {
    headers: {
      "86fb05fb43ab9338b78326d66dcdd819": import.meta.env.VITE_API_FOOTBALL_KEY
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar os jogos de hoje");
  }

  const data = await response.json();
  return data.response;
}

// Função para buscar odds por ID do jogo
export async function getOddsByMatchId(matchId) {
  const response = await fetch(`${BASE_URL}/odds?fixture=${matchId}`, {
    headers: {
      "86fb05fb43ab9338b78326d66dcdd819": import.meta.env.VITE_API_FOOTBALL_KEY
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar odds");
  }

  const data = await response.json();
  return data.response;
}
