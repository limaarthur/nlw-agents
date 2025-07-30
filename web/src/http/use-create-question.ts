import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateQuestionRequest } from './types/create-question-request'
import type { CreateQuestionResponse } from './types/create-question-response'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({ // Para criação, remoção e edição de dados
    mutationFn: async (data: CreateQuestionRequest) => { // Função que iremos executar para criação da sala
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )

      const result: CreateQuestionResponse = await response.json()

      return result
    }, 

    onSuccess: () => { // Dispara uma função quando a criação da sala for sucesso
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] }) // Invalida a query
    },
  })
}