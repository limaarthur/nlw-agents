export type GetRoomQuestionsResponse = Array< { // Determina que a nossa API será um array de objetos
  id: string
  question: string
  answer: string | null
  createdAt: string
}>