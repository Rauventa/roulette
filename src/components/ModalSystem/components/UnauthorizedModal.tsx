import React from 'react';
import {Modal} from "../../Modal/Modal";
import {IModal} from "../../../interfaces/modal/IModal";
import {$t} from "../../../lib/i18n";

export const UnauthorizedModal = ({
  message,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)
  }

  return (
    <Modal
      title={'Unauthorized'}
      onResolve={handleShow}
      buttons={[
          {
            value: true,
            text: 'Login again',
            light: true,
            to: '/login'
          }
        ]}
    >
      <div>
        {$t(message)}
      </div>
    </Modal>
)
}