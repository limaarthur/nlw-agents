import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateRoomRequest } from './types/create-room-request'
import type { CreateRoomResponse } from './types/create-room-response'

export function useCreateRoom() {
  const queryClient = useQueryClient()
  
  return useMutation({ // Para criação, remoção e edição de dados
    mutationFn: async (data: CreateRoomRequest) => { // Função que iremos executar para criação da sala
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result: CreateRoomResponse = await response.json()

      return result
    }, 

    onSuccess: () => { // Dispara uma função quando a criação da sala for sucesso
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] }) // Invalida a query
    },
  })
}