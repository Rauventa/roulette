import React from 'react';
import {Modal} from "../../Modal/Modal";
import {IModal} from "../../../interfaces/modal/IModal";
import {useTranslation} from "react-i18next";

export const ErrorModal = ({
  message,
  onClose
}: IModal) => {

  const handleShow = (value: boolean) => {
    onClose(value)

    window.location.reload()
  }

  const {t} = useTranslation()

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
        {t(`${message}`)}
      </div>
    </Modal>
  )
}