import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl">404 - Página não encontrada</h1>
      <Link to="/" className="text-blue-400">Voltar para a página inicial</Link>
    </div>
  )
}
