import React from 'react';
import { IModal } from '../../../interfaces/modal/IModal';
import {$t} from "../../../lib/i18n";
import {Modal} from "../../Modal/Modal";

export const InfoModal = ({
  message,
  formState,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)
  }

  return (
    <Modal
      title={formState.title}
      onResolve={handleShow}
      buttons={formState.buttons}
    >
      <div>
        {$t(message)}
      </div>
    </Modal>
  )
}