import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

// Verifica se o navegador suporta a funcionalidade de gravação de áudio
const isRecordingSupported = !!navigator.mediaDevices 
  && typeof navigator.mediaDevices.getUserMedia === 'function'
  && typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

   // Interrompe a gravação e atualiza o estado
  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    // Envia os dados de áudio gravados para a api
    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`, 
      {
        method: 'POST',
        body: formData,
      }
    )

    // Converte o resultado para JSON
    const result = await response.json()

    console.log(result)
  }

  // Inicia a gravação de áudio, solicitando permissão ao usuário
  async function startRecording() {
    // Exibe alerta caso o navegador não suporte gravação
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    // Solicita acesso ao microfone com configurações específicas
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true, // Reduz eco
        noiseSuppression: true, // Reduz ruído de fundo
        sampleRate: 44_100, // Taxa de amostragem padrão
      },
    })

    // Cria uma instância do MediaRecorder com formato e qualidade definidos
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    // Define os eventos para captura de dados, início e fim da gravação
    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    // Inicia a gravação de áudio
    recorder.current.start()
  }

  if (!params.roomId) {
  return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen items-center justify-center gap-3 flex-col">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}