import React, {useContext} from 'react';
import { $t } from '../../lib/i18n';
import './ErrorModal.scss'
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import { closeModalHandler } from '../../store/actions/Modal/modalActions';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

interface ErrorModalProps {

}

export const ErrorModal = ({

}: ErrorModalProps) => {

  const message = useSelector((state: any) => state.errorReducer.errorMessage)
  const status = useSelector((state: any) => state.errorReducer.status)

  const history = useHistory()

  const {logout} = useContext(AuthContext);

  const dispatch = useDispatch()

  const modalCloseHandler = () => {
    dispatch(closeModalHandler())

    window.location.reload()
  }

  const logoutHandler = () => {
    logout()
    history.push('/login')
  }

  return (
    <div className={'modal-overflow '}>
      <div className="modal error-modal">
        <div className="modal__title">
          {$t('Error')}
        </div>

        <div className="error-modal__message">
          {$t(`${message} ${status ? `with status ${status}` : ''}`)}
        </div>

        <div className="modal__buttons">
          {(status >= 402 || status === 400 || !status) ?
            <Button light onClick={modalCloseHandler}>
              {$t('Try again')}
            </Button> : null
          }
          {status === 401 ?
            <Button light onClick={logoutHandler}>
              {$t('Login again')}
            </Button> : null
          }
        </div>
      </div>
    </div>
  )
}