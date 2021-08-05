import {showModal} from "../../components/ModalSystem/ModalSystem";

export const gameModalService = (type: string, formState: any) => {
  return showModal({type, formState}).then((data: any) => data)
}