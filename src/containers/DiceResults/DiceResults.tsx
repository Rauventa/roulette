import React, {useContext, useEffect, useState} from 'react';
import './DiceResults.scss';
import { Card } from '../../components/Card/Card';
import {useDispatch, useSelector} from "react-redux";
import {getDiceHistory} from "../../store/actions/Dice/diceActions";
import {AuthContext} from "../../context/AuthContext";
import {Table} from "../../components/Table/Table";
import { $t } from '../../lib/i18n';
import dateformat from 'dateformat'

import DefaultIcon from './img/default.png'
import {ReactComponent as InfoIcon} from "./img/icon-info.svg";

import { Button } from '../../components/Button/Button';
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {IResult} from "../../interfaces/results/IResult";
import {currencyValueChanger} from "../../lib/numberRefractor";
import {getTicker} from "../../lib/tickers";
import { config } from '../../config/config';
import {OldModal} from "../../components/Modal/OldModal";
import {closeModalHandler, openModalHandler} from "../../store/actions/Modal/modalActions";

export const DiceResults = ({
  type,
  noTitle
}: IResult) => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  useEffect(() => {
    changeHistoryType(type)
  }, [])

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const data = useSelector((state: any) => state.diceReducer.history).map((item: any) => {
    return {
      ...item,
      name: item.userName,
      icon: item.userAvatarUrl,
      game: item.gameNumber,
      bet: item.bet,
      chance: `${item.chance}%`,
      own: item.chance + 1,
      generated: item.hiddenNumber,
      result: item.userWin,
      profit: item.gain,
      date: dateformat(new Date(item.playDate).toString(), "d.mm.yyyy hh:MM"),
      hash: item.hash,
    }
  })

  const [historyType, setHistoryType] = useState<string>(type)
  const [loader, setLoader] = useState<boolean>(false)

  const changeHistoryType = async (type: string) => {

    setLoader(true)

    setHistoryType(type)

    try {
      if (type === 'all') {
        await dispatch(getDiceHistory(token, {pageSize: 100000, pageNumber: 0, onlyMe: false}))
      }

      if (type === 'me') {
        await dispatch(getDiceHistory(token, {pageSize: 100000, pageNumber: 0, onlyMe: true}))
      }
    } catch (e) {
      console.log(e)
    }

    setLoader(false)
  }


  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({row: {original}}: any) => (
        <div className={'table-user'}>
          <div className={'table-user__icon'}>
            {original.icon ?
              <img src={`${config.apiPhotoPrefixUrl}/${original.icon}`} alt="user icon"/> :
              <img src={DefaultIcon} alt="user icon"/>
            }
          </div>
          {original.name === '[Hidden]' ?
              <div className="table-user__name hidden-nickname">
                {$t('Hidden')}
              </div> :
              <div className="table-user__name">
                {$t(original.name)}
              </div>
          }
        </div>
      )
    },
    {
      Header: 'Game',
      accessor: 'game'
    },
    {
      Header: 'Bet',
      accessor: 'bet',
      Cell: ({row: {original}} : any) => (
        <div>
          {$t(`${currencyValueChanger(currency, rate, original.bet)} ${getTicker(currency)}`)}
        </div>
      )
    },
    {
      Header: 'Chance',
      accessor: 'chance'
    },
    {
      Header: 'Result',
      accessor: 'result',
      Cell: ({row: {original}}: any) => (
          <div className={`bold ${original.result ? 'success' : 'danger'}`}>
            {$t(`${original.result ? '+' : '-'} ${currencyValueChanger(currency, rate, original.profit, {absolute: true})} ${getTicker(currency)}`)}
          </div>
      )
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Fair Game',
      accessor: 'hash',
      Cell: ({row: {original}}: any) => (
          <div className={'table-hidden'}>
            {$t(`${original.hash.slice(0, 15)}...`)}

            {/*<span className={'table-hidden__full'}>*/}
            {/*      {$t(original.hash)}*/}
            {/*</span>*/}
          </div>
      )
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: ({row: {original}}: any) => (
          <div className={'table-actions'}>
            <InfoIcon />
          </div>
      )
    },
  ]

  return (
    <Card
      className={'history-card'}
      title={!noTitle ? 'Games History' : ''}
    >

      {/*<CSSTransition in={modal} timeout={500} unmountOnExit classNames="my-node">*/}
      {/*  <OldModal*/}
      {/*      title={'Dice result'}*/}
      {/*      type={'lll'}*/}
      {/*      formState={result}*/}
      {/*      onClose={modalCloseHandler}*/}
      {/*  />*/}
      {/*</CSSTransition>*/}

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      {type === 'all' ?
        <div className="history-card__extra">
          <Button dark className={historyType === 'me' ? 'default' : ''} onClick={() => changeHistoryType('all')}>
            {$t('All players')}
          </Button>
          <Button dark className={historyType === 'all' ? 'default' : ''} onClick={() => changeHistoryType('me')}>
            {$t('Only me')}
          </Button>
        </div> : null
      }

      <Table
          data={data}
          columns={columns}
      />
    </Card>
  )
}