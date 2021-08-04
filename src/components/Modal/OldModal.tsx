import React from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import './Modal.scss'
import {useSelector} from "react-redux";
import {currencyValueChanger} from "../../lib/numberRefractor";
import {getTicker} from "../../lib/tickers";

interface ModalProps {
  title: string,
  type: string,
  formState: any;

  onClose: () => void
}

export const OldModal = ({
  title,
  type,
  formState,
  onClose
}: ModalProps) => {

  const proofLine = `${formState.hiddenNumber}${formState.salt}`;

  const currency = useSelector((state: any) => state.balanceReducer.currency);
  const rate = useSelector((state: any) => state.balanceReducer.rate)

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
              {$t(`${currencyValueChanger(currency, rate, formState.bet)} ${getTicker(currency)}`)}
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
              {$t(`${currencyValueChanger(currency, rate, formState.gain, {absolute: true})} ${getTicker(currency)}`)}
            </div>
          </div>
          <div className="status-modal__divider" />
          <div className="status-modal__info text-secondary">
            {$t('Game hash = generated number + salt. You can check it with sha256 decoder.')}
          </div>
          <div className="status-modal__item small">
            <div className="status-modal__item_info">
              {$t(`Salt - ${formState.salt}`)}
            </div>
          </div>
          <div className="status-modal__item small">
            <div className="status-modal__item_info">
              {$t(`Hash - ${formState.lastHash}`)}
            </div>
          </div>
          <div className="status-modal__item small">
            <div className="status-modal__item_info">
              {$t(`Proof - ${proofLine}`)}
            </div>
          </div>
        </div>

        <div className="modal__buttons">
          <Button primary onClick={onClose}>
            {$t('Start new game')}
          </Button>
          <a className={'btn btn-light'} href={`https://md5calc.com/hash/sha256/${proofLine}`} target={'_blank'}>
            {$t('Check it')}
          </a>
        </div>

      </div>
    </div>
  )
}