import React from 'react';
import './RouletteBetModal.scss';
import {Modal} from "../../../Modal/Modal";
import {IModal} from "../../../../interfaces/modal/IModal";
import { $t } from '../../../../lib/i18n';

export const RouletteBetModal = ({
  formState,
  onClose,
}: IModal) => {

    const handleShow = (value: boolean) => {
        onClose(value)
    }

    // const proofLine = `${formState.hiddenNumber}${formState.salt}`;

    let buttons: any = [
        {
            value: true,
            text: 'Start new game',
            primary: true
        },
        // {
        //     value: false,
        //     text: 'Check it',
        //     light: true,
        //     defaultLink: true,
        //     href: `https://md5calc.com/hash/sha256/${proofLine}`,
        //     target: '_blank'
        // }
    ]

    return (
        <Modal
            className={'roulette-modal'}
            title={'Game'}
            subtitle={'#415'}
            onResolve={handleShow}
            buttons={buttons}
        >
            <>
                <div className={'roulette-modal__info'}>
                    <div className="roulette-modal__info_item">
                        <div className="roulette-modal__info_item-title">
                            {$t('Fair Game')}
                        </div>
                        <div className="roulette-modal__info_item-value">
                            {$t('dsfsdfsdf')}
                        </div>
                    </div>
                    <div className="roulette-modal__info_item">
                        <div className="roulette-modal__info_item-title">
                            {$t('Mode')}
                        </div>
                        <div className="roulette-modal__info_item-value">
                            {$t('dsfsdf')}
                        </div>
                    </div>
                </div>
                <div className={'roulette-modal__stats'}>
                    <div className="roulette-modal__stats_pot">
                        <div className="roulette-modal__stats_pot-value">
                            10000
                            <span className={'roulette-modal__stats_pot-value--currency'}>
                                BTC
                            </span>
                        </div>
                        <div className="roulette-modal__stats_pot-title">
                            {$t('Pot')}
                        </div>
                    </div>
                    <div className="roulette-modal__stats_players">
                        <div className="roulette-modal__stats_players-value">
                            42
                        </div>
                        <div className="roulette-modal__stats_players-title">
                            {$t('Players')}
                        </div>
                    </div>
                    <div className="roulette-modal__stats_count">
                        <div className="roulette-modal__stats_count-value">
                            60
                        </div>
                        <div className="roulette-modal__stats_count-title">
                            {$t('Total Bets')}
                        </div>
                    </div>
                </div>
                <div className="roulette-modal__players">
                    <div className="roulette-modal__players_item">
                        <div className="roulette-modal__players_item-number">
                            {$t('1')}
                        </div>
                        <div className="roulette-modal__players_item-player">
                            <div className="roulette-modal__players_item-player--avatar">

                            </div>
                            <div className="roulette-modal__players_item-player--data">
                                <div className="roulette-modal__players_item-player--data_name">
                                    {$t('Alex')}
                                </div>
                                <div className="roulette-modal__players_item-player--data_tickets">
                                    {$t('dfgdfgdf')}
                                </div>
                            </div>
                        </div>
                        <div className="roulette-modal__players_item-bet">
                            <div className="roulette-modal__players_item-bet--value">
                                {$t('$241')}
                            </div>
                            <div className="roulette-modal__players_item-bet--chance">
                                {$t('2,32%')}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Modal>
    )
}