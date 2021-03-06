import React, {useState} from 'react';
import './RouletteBetModal.scss';
import {Modal} from "../../../Modal/Modal";
import {IModal} from "../../../../interfaces/modal/IModal";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {getTicker} from "../../../../lib/tickers";
import {useSelector} from "react-redux";
import {config} from "../../../../config/config";
import DefaultIcon from "../../../../containers/DiceResults/img/default.png";

import {ReactComponent as InfoIcon} from "./img/info.svg";
import {useTranslation} from "react-i18next";

export const RouletteBetModal = ({
  formState,
  onClose,
}: IModal) => {

    const [additional, setAdditional] = useState<boolean>(false)

    const {t} = useTranslation()

    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const rate = useSelector((state: any) => state.balanceReducer.rate)

    const handleShow = (value: boolean) => {
        onClose(value)
    }

    const bets = formState.bets.sort((x: any, y: any) => {
        return (x.isWinner === y.isWinner)? 0 : x.isWinner? -1 : 1;
    })

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

    const showAdditional = () => {
        setAdditional(!additional)
    }

    return (
        <Modal
            className={'roulette-modal'}
            title={'Game'}
            subtitle={`#${formState.gameNumber}`}
            onResolve={handleShow}
            buttons={buttons}
        >
            <>
                <div className={'roulette-modal__info'}>
                    <div className="roulette-modal__info_item">
                        <div className="roulette-modal__info_item-title">
                            {t('Mode')}
                        </div>
                        <div className="roulette-modal__info_item-value">
                            {t(`${formState.gameMode}`)}
                        </div>
                    </div>
                    <div className="roulette-modal__info_item">
                        <div className="roulette-modal__info_item-title">
                            {t('Fair Game')}
                        </div>
                        <div className="roulette-modal__info_item-value">
                            {t(formState.hash)}
                            <InfoIcon
                              onClick={showAdditional}
                            />
                        </div>
                    </div>
                    {additional ?
                      <>
                          <div className="roulette-modal__info_item">
                              <div className="roulette-modal__info_item-title">
                                  {t('Number')}
                              </div>
                              <div className="roulette-modal__info_item-value">
                                  {t(formState.hiddenNumber)}
                              </div>
                          </div>
                          <div className="roulette-modal__info_item">
                              <div className="roulette-modal__info_item-title">
                                  {t('Win Ticket')}
                              </div>
                              <div className="roulette-modal__info_item-value">
                                  {t(`${formState.hiddenNumber} * ${formState.bank} = ${formState.hiddenNumber * formState.bank}`)}
                              </div>
                          </div>
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
                <div className={'roulette-modal__stats'}>
                    <div className="roulette-modal__stats_pot">
                        <div className="roulette-modal__stats_pot-value">
                            {t(`${currencyValueChanger(currency, rate, formState.bank)}`)}
                            <span className={'roulette-modal__stats_pot-value--currency'}>
                                {t(`${getTicker(currency)}`)}
                            </span>
                        </div>
                        <div className="roulette-modal__stats_pot-title">
                            {t('Pot')}
                        </div>
                    </div>
                    <div className="roulette-modal__stats_players">
                        <div className="roulette-modal__stats_players-value">
                            {formState.players.length}
                        </div>
                        <div className="roulette-modal__stats_players-title">
                            {t('Players')}
                        </div>
                    </div>
                    <div className="roulette-modal__stats_count">
                        <div className="roulette-modal__stats_count-value">
                            {formState.bets.length}
                        </div>
                        <div className="roulette-modal__stats_count-title">
                            {t('Total Bets')}
                        </div>
                    </div>
                </div>
                <div className="roulette-modal__players">
                    {bets.map((item: any, index: number) => {
                        return (
                          <div key={index} className={`roulette-modal__players_item ${item.isWinner ? 'winner' : ''}`}>

                              {item.isWinner ?
                                <div className="roulette-modal__players_item-winner">
                                    {t('winner')}
                                </div> : null
                              }

                              <div className="roulette-modal__players_item-content">
                                  <div className="roulette-modal__players_item-number">
                                      {t(`${index + 1}`)}
                                  </div>
                                  <div className="roulette-modal__players_item-player">
                                      <div className="roulette-modal__players_item-player--avatar">
                                          {item.user.avatarUrl ?
                                              <img src={`${config.apiPhotoPrefixUrl}/${item.user.avatarUrl }`} alt="user icon"/> :
                                              <img src={DefaultIcon} alt="user icon"/>
                                          }
                                      </div>
                                      <div className="roulette-modal__players_item-player--data">
                                          <div className="roulette-modal__players_item-player--data_name">
                                              {t(item.user.name)}
                                          </div>
                                          <div className="roulette-modal__players_item-player--data_tickets">
                                              {t(`Tickets ${item.ticketFrom} - ${item.ticketTo}`)}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="roulette-modal__players_item-bet">
                                  <div className="roulette-modal__players_item-bet--value">
                                      {t(`${currencyValueChanger(currency, rate, item.amount)} ${getTicker(currency)}`)}
                                  </div>
                                  {item.isWinner ?
                                    <div className="roulette-modal__players_item-bet--chance">
                                        {t(`${item.chance}%`)}
                                    </div> : null
                                  }
                              </div>
                          </div>
                        )
                    })}
                </div>
            </>
        </Modal>
    )
}