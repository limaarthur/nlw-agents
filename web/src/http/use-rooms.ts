import { useQuery } from '@tanstack/react-query'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'], // Identificador único para a chamada HTTP
    queryFn: async () => { // Função que será executada para trazer os dados da API
      const response = await fetch('http://localhost:3333/rooms') // Faz a chamada a API
      const result: GetRoomsResponse = await response.json() // Converte para JSON

      return result
    }, 
  })
}