import {showModal} from "../../components/ModalSystem/ModalSystem";

export const authModalService = (formState?: any) => {
  return showModal({type: 'auth', formState})
}