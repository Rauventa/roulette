import React from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import './Modal.scss'

interface ModalProps {
  title: string,
  type: string,
  formState: any;

  onClose: () => void
}

export const Modal = ({
  title,
  type,
  formState,
  onClose
}: ModalProps) => {

  return (
    <div className={'modal-overflow'}>
      <div className={'modal'}>

        <div className={`modal__title ${formState.userWin ? 'success' : 'danger'}`}>
          {formState.userWin ? $t('You won!') : $t('You lose')}
        </div>

        <div className="modal__content status-modal">
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Your bet')}
            </div>
            <div className="status-modal__item_value">
              {$t(`${(formState.bet).toFixed(8)} BTC`)}
            </div>
          </div>
          {type === 'dice' ?
            <div className="status-modal__item">
              <div className="status-modal__item_title">
                {$t('Your number')}
              </div>
              <div className="status-modal__item_value">
                {$t(formState.ownNumber)}
              </div>
            </div> : null
          }
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Generated number')}
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
              {$t(`${Math.abs(formState.gain).toFixed(8)} BTC`)}
            </div>
          </div>
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Salt')}
            </div>
            <div className="status-modal__item_value">
              {$t(formState.salt)}
            </div>
          </div>
          <div className="status-modal__item">
            <div className="status-modal__item_title">
              {$t('Proof')}
            </div>
            <div className="status-modal__item_value">
              {$t('sdfsdf')}
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