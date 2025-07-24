import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from './ui/card'
import type { GetRoomsResponse } from '@/http/types/get-rooms-response'

export function RoomList() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'], // Identificador único para a chamada HTTP
    queryFn: async () => { // Função que será executada para trazer os dados da API
      const response = await fetch('http://localhost:3333/rooms') // Faz a chamada a API
      const result: GetRoomsResponse = await response.json() // Converte para JSON

      return result
    }, 
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && ( 
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}

        {data?.map(room => {
          return ( 
            <Link 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50" 
              key={room.id} 
              to={`/rooms/${room.id}`}
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}