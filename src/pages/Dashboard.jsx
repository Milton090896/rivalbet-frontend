import { useEffect, useState, useRef } from "react"

export default function Dashboard() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const winner = calculateWinner(squares)

  // Refs para os sons
  const bgMusicRef = useRef(null)
  const winSoundRef = useRef(null)
  const clickSoundRef = useRef(null)

  // Toca música de fundo ao clicar na tela
  useEffect(() => {
    const audio = new Audio("/sounds/bg-music.mp3")
    audio.loop = true
    audio.volume = 0.3

    const playAudio = () => {
      audio.play().catch((err) => {
        console.log("Autoplay bloqueado:", err)
      })
    }

    document.addEventListener("click", playAudio, { once: true })

    return () => {
      document.removeEventListener("click", playAudio)
      audio.pause()
    }
  }, [])

  // Toca som de fundo (caso use <audio ref>)
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.2
      bgMusicRef.current.loop = true
      bgMusicRef.current.play().catch(e => console.log("Som bloqueado pelo navegador."))
    }
  }, [])

  // Toca som de vitória
  useEffect(() => {
    if (winner && winSoundRef.current) {
      winSoundRef.current.play()
    }
  }, [winner])

  const handleClick = (i) => {
    if (squares[i] || winner) return
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? "X" : "O"
    setSquares(newSquares)
    setXIsNext(!xIsNext)
    if (clickSoundRef.current) {
      clickSoundRef.current.play()
    }
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const getPlayerName = (symbol) => {
    if (symbol === "X") return "Jogador A"
    if (symbol === "O") return "Jogador B"
    return null
  }

  const status = winner
    ? `${getPlayerName(winner)} venceu!`
    : `Vez de ${xIsNext ? "Jogador A (X)" : "Jogador B (O)"}`

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Jogo da Velha</h1>
      <div className="mb-2 text-xl">{status}</div>

      <div className="grid grid-cols-3 gap-2">
        {squares.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 text-2xl font-bold bg-white border-2 border-blue-500 rounded hover:bg-blue-100"
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reiniciar
      </button>

      {/* Elementos de áudio invisíveis */}
      <audio ref={bgMusicRef} src="/sounds/bg-music.mp3" />
      <audio ref={clickSoundRef} src="/sounds/click.mp3" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" />
    </div>
  )
}

// Função para verificar vencedor
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
