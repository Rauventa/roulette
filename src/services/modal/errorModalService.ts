import { showModal } from "../../components/ModalSystem/ModalSystem"

export const errorModalService = (message: string, status: number) => {
  if (status === 401) {
    return showModal({type: 'unauthorized', message: `You are not authorized`})
  }

  return showModal({type: 'error', message: `${message} with status ${status}`})
}