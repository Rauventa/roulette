import React from 'react';
import {Modal} from "../../Modal/Modal";
import {IModal} from "../../../interfaces/modal/IModal";
import {$t} from "../../../lib/i18n";

export const ErrorModal = ({
  message,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)

    window.location.reload()
  }

  return (
    <Modal
      title={'Error'}
      onResolve={handleShow}
      buttons={[
        {
          value: true,
          text: 'Try again',
          light: true
        }
      ]}
    >
      <div>
        {$t(message)}
      </div>
    </Modal>
  )
}