import React from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import './Modal.scss'

interface ModalProps {
  title: string,
  formState: any;

  onClose: () => void
}

export const Modal = ({
  title,
  formState,
  onClose
}: ModalProps) => {

  return (
    <div className={'modal-overflow'}>
      <div className={'modal'}>
        {/*<div className="modal__title">*/}
        {/*  {$t(title)}*/}
        {/*</div>*/}

        <div className={`modal__message ${formState.userWin ? 'success' : 'danger'}`}>
          {formState.userWin ? $t('You won!') : $t('You lose')}
        </div>

        {/*<p>Your bet - {formState.bet}</p>*/}
        {/*<p>Your chance - {formState.chance}</p>*/}
        {/*<p>Your number - {formState.ownNumber}</p>*/}
        {/*<p>Computer number - {formState.hiddenNumber}</p>*/}
        {/*<p>Profit - {formState.gain} BTC</p>*/}
        {/*<p>Salt - {formState.salt}</p>*/}

        {/*<h1>STATUS - {formState.userWin ? 'WIN' : 'LOSE'}</h1>*/}

        <Button primary onClick={onClose}>
          {$t('Start new game')}
        </Button>

      </div>
    </div>
  )
}