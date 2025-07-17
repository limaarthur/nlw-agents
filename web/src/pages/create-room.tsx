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
      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col gap-1">
        {data?.map(room => {
          return ( 
            <Link key={room.id} to={`/room/${room.id}`}>
              {room.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}