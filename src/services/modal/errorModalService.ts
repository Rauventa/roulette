import { showModal } from "../../components/ModalSystem/ModalSystem"

//TODO - Не используется в текущей версии, заменена компонентом informer

export const errorModalService = (message: string, status: number) => {
  if (status === 401) {
    return showModal({type: 'unauthorized', message: `You are not authorized`})
  }

  return showModal({type: 'error', message: `${message} ${status ? `with status ${status}` : ''}`})
}