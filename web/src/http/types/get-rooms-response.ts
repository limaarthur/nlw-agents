export type GetRoomsResponse = Array< { // Determina que a nossa API será um array de objetos com id e name
  id: string
  name: string
  questionsCount: number
  createdAt: string
}>