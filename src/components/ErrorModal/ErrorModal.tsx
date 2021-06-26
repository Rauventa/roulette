import React from 'react';
import { $t } from '../../lib/i18n';
import './ErrorModal.scss'
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import { closeModalHandler } from '../../store/actions/Modal/modalActions';

interface ErrorModalProps {

}

export const ErrorModal = ({

}: ErrorModalProps) => {

  const message = useSelector((state: any) => state.errorReducer.errorMessage)

  const dispatch = useDispatch()

  const modalCloseHandler = () => {
    dispatch(closeModalHandler())

    window.location.reload()
  }

  return (
    <div className={'modal-overflow '}>
      <div className="modal error-modal">
        <div className="modal__title">
          {$t('Error')}
        </div>

        <div className="error-modal__message">
          {$t(message)}
        </div>

        <div className="modal__buttons">
          <Button primary onClick={modalCloseHandler}>
            {$t('Reload page')}
          </Button>
        </div>
      </div>
    </div>
  )
}