import React, {useState} from 'react';
import {Modal} from "../../Modal/Modal";
import {IModal} from "../../../interfaces/modal/IModal";
import {useSelector} from "react-redux";
import {currencyValueChanger} from "../../../lib/numberRefractor";
import {getTicker} from "../../../lib/tickers";
import {useTranslation} from "react-i18next";
import {ReactComponent as InfoIcon} from "./RouletteBetModal/img/info.svg";

export const GameBetModal = ({
  type,
  formState,
  onClose
}: IModal) => {

  const [additional, setAdditional] = useState<boolean>(false)

  const handleShow = (value: boolean) => {
    onClose(value)
  }

  const currency = useSelector((state: any) => state.balanceReducer.currency);
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const {t} = useTranslation()

  const proofLine = `${formState.hiddenNumber}${formState.salt}`;

  let buttons: any = [
    {
      value: true,
      text: 'Close',
      primary: true
    },
    {
      value: false,
      text: 'Check it',
      light: true,
      defaultLink: true,
      href: `https://md5calc.com/hash/sha256/${proofLine}`,
      target: '_blank'
    }
  ]

  if (formState.reopen) {
    buttons = [
      {
        value: false,
        text: 'Close',
        primary: true,
      },
      {
        value: false,
        text: 'Check it',
        light: true,
        defaultLink: true,
        href: `https://md5calc.com/hash/sha256/${proofLine}`,
        target: '_blank'
      }
    ]
  }

  const showAdditional = () => {
    setAdditional(!additional)
  }

  return (
    <Modal
      className={'status-modal'}
      title={'Game'}
      subtitle={`#${formState.gameNumber}`}
      onResolve={handleShow}
      buttons={buttons}
    >
      <>
        <div className="status-modal__total">
          <div className={`status-modal__total_text ${formState.userWin ? 'success' : 'danger'}`}>
            {formState.userWin ?
              t(`You won ${currencyValueChanger(currency, rate, formState.gain, {absolute: true})} ${getTicker(currency)}`) :
              t('You lose')
            }
          </div>
        </div>
        <div className={'roulette-modal__stats'}>
          <div className="roulette-modal__stats_pot">
            <div className="roulette-modal__stats_pot-value">
              {t(`${currencyValueChanger(currency, rate, formState.bet)}`)}
              <span className={'roulette-modal__stats_pot-value--currency'}>
                {t(`${getTicker(currency)}`)}
              </span>
            </div>
            <div className="roulette-modal__stats_pot-title">
              {t('Bet')}
            </div>
          </div>
          <div className="roulette-modal__stats_players">
            <div className="roulette-modal__stats_players-value">
              {type === 'dice-game' ?
                formState.ownNumber || formState.own : null
              }
              {type === 'hilo-game' && formState.rollType === 'LessThan48' ?
                '< 48' : null
              }
              {type === 'hilo-game' && formState.rollType === 'MoreThan52' ?
                '> 52' : null
              }
            </div>
            <div className="roulette-modal__stats_players-title">
              {t('Yours')}
            </div>
          </div>
          <div className="roulette-modal__stats_count">
            <div className="roulette-modal__stats_count-value">
              {formState.hiddenNumber}
            </div>
            <div className="roulette-modal__stats_count-title">
              {t('Generated')}
            </div>
          </div>
        </div>
        <div className={'roulette-modal__info'}>
          <div className="roulette-modal__info_item">
            <div className="roulette-modal__info_item-title">
              {t('Fair Game')}
            </div>
            <div className="roulette-modal__info_item-value">
              {t(formState.lastHash || formState.hash)}
              <InfoIcon
                onClick={showAdditional}
              />
            </div>
          </div>
          {additional ?
            <>
              <div className="roulette-modal__info_item">
                <div className="roulette-modal__info_item-title">
                  {t('Salt')}
                </div>
                <div className="roulette-modal__info_item-value">
                  {t(formState.salt)}
                </div>
              </div>
              <div className="roulette-modal__info_item">
                <div className="roulette-modal__info_item-title">
                  {t('Proof')}
                </div>
                <div className="roulette-modal__info_item-value">
                  {t(`Number + Salt = ${proofLine}`)}
                </div>
              </div>
            </> : null
          }
        </div>
      </>
    </Modal>
  )
}