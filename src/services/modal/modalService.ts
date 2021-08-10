import {showModal} from "../../components/ModalSystem/ModalSystem";

export const modalService = (type: string, message?: string, formState?: any) => {
  return showModal({type, message, formState})
}