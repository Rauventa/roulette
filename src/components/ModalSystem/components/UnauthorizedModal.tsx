import React from 'react';
import {Modal} from "../../Modal/Modal";
import {IModal} from "../../../interfaces/modal/IModal";
import {useTranslation} from "react-i18next";

export const UnauthorizedModal = ({
  message,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)
  }

  const {t} = useTranslation()

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
        {t(`${message}`)}
      </div>
    </Modal>
)
}