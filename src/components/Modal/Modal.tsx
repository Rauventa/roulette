import React from 'react';
import './Modal.scss'
import { Button } from '../Button/Button';
import {useHistory} from "react-router-dom";
import { t } from '../../lib/i18n';

import {ReactComponent as CloseIcon} from "./img/closePic.svg";
import {useDispatch} from "react-redux";
import {loaderVisibilityHandler} from "../../store/actions/Application/applicationActions";

interface ModalProps {
  className?: string,
  children?: any,
  title?: string,
  subtitle?: string,
  buttons?: any,
  onResolve: (value: boolean) => void
}

export const Modal = ({
  className,
  children,
  title,
  subtitle,
  buttons,
  onResolve
}: ModalProps) => {

  const dispatch = useDispatch()

  const history = useHistory()

  const handleResolve = async (value: boolean, to?: string) => {
    dispatch(loaderVisibilityHandler(true))

    onResolve(value)

    if (to) {
      history.push(to)
    }

    dispatch(loaderVisibilityHandler(false))
  }

  return (
    <div className={'modal-overflow'}>
      <div className={`modal ${className || ''}`}>
        <div className="modal__close" onClick={() => handleResolve(false)}>
          <CloseIcon />
        </div>
        <div className="modal__title">
          <div className="modal__title_main">
            {title ? t(title) : null}
          </div>
          <div className="modal__title_additional">
            {subtitle ? t(subtitle) : null}
          </div>
        </div>
        <div className={'modal__content'}>
          {children}
        </div>
        <div className="modal__buttons">
          {buttons?.map((button: any, index: number) => (
            <Button
              key={index}
              onClick={() => handleResolve(button.value, button.to)}
              {...button}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}