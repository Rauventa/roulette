import React from 'react';
import { IModal } from '../../../interfaces/modal/IModal';
import {Modal} from "../../Modal/Modal";
import {useTranslation} from "react-i18next";

export const InfoModal = ({
  message,
  formState,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)
  }

  const {t} = useTranslation()

  return (
    <Modal
      title={formState.title}
      onResolve={handleShow}
      buttons={formState.buttons}
    >
      <div>
        {t(`${message}`)}
      </div>
    </Modal>
  )
}