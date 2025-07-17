import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array< { // Determina que a nossa API será um array de objetos com id e name
  id: string
  name: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'], // Identificador único para a chamada HTTP
    queryFn: async () => { // Função que será executada para trazer os dados da API
      const response = await fetch('http://localhost:3333/rooms') // Faz a chamada a API
      const result: GetRoomsAPIResponse = await response.json() // Converte para JSON

      return result
    }, 
  })

  return (
    <div>
      <div>Create Room</div>

      {isLoading && <p>Carregando...</p>}
      <pre>{data && JSON.stringify(data, null, 2)}</pre>

      <Link className="underline" to="/room">
        Acessar sala
      </Link>
    </div>
  )
}