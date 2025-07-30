import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionsResponse } from './types/get-room-questions'

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId], // Identificador único para a chamada HTTP, lista uma sala específica
    queryFn: async () => { // Função que será executada para trazer os dados da API
      const response = await fetch( // Faz a chamada a API
        `http://localhost:3333/rooms/${roomId}/questions`
      ) 
      const result: GetRoomQuestionsResponse = await response.json() // Converte para JSON

      return result
    }, 
  })
}