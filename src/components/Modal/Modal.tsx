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

  console.log(formState)

  return (
    <div className={'modal-overflow'}>
      <div className={'modal'}>
        {/*<div className="modal__title">*/}
        {/*  {$t(title)}*/}
        {/*</div>*/}

        <div className={`modal__title ${formState.userWin ? 'success' : 'danger'}`}>
          {formState.userWin ? $t('You won!') : $t('You lose')}
        </div>

        <div className="modal__content status-modal">
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Your number')}
            </div>
            <div className="status-modal__item_value">
              {$t(formState.chance)}
            </div>
          </div>
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Gained number')}
            </div>
            <div className="status-modal__item_value">
              {$t(formState.hiddenNumber)}
            </div>
          </div>
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {formState.userWin ?
                  $t('Total win') :
                  $t('Total loss')
              }
            </div>
            <div className="status-modal__item_value">
              {$t(`${Math.abs(formState.gain)} BTC`)}
            </div>
          </div>
        </div>

        {/*<p>Your bet - {formState.bet}</p>*/}
        {/*<p>Your chance - {formState.chance}</p>*/}
        {/*<p>Your number - {formState.ownNumber}</p>*/}
        {/*<p>Computer number - {formState.hiddenNumber}</p>*/}
        {/*<p>Profit - {formState.gain} BTC</p>*/}
        {/*<p>Salt - {formState.salt}</p>*/}

        {/*<h1>STATUS - {formState.userWin ? 'WIN' : 'LOSE'}</h1>*/}

        <div className="modal__buttons">
          <Button primary onClick={onClose}>
            {$t('Start new game')}
          </Button>
        </div>

      </div>
    </div>
  )
}