import React from 'react';
import {IModal} from "../../../../interfaces/modal/IModal";
import {Modal} from "../../../Modal/Modal";
import {SignIn} from "../../../../pages/AuthPage/components/SignIn/SignIn";
import {SignUp} from "../../../../pages/AuthPage/components/SignUp/SignUp";

export const AuthModal = ({
  formState,
  onClose
}: IModal) => {

  return (
    <Modal
      className={'auth-modal'}
      onResolve={onClose}
    >
      {formState.type === 'SignIn' ?
        <SignIn
          onCloseModal={onClose}
        /> :
        <SignUp
          onCloseModal={onClose}
        />
      }
    </Modal>
  )
}