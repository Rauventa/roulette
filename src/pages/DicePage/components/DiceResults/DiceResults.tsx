import React, {useContext, useEffect} from 'react';
import './DiceResults.scss';
import { Card } from '../../../../components/Card/Card';
import {useDispatch, useSelector} from "react-redux";
import {getDiceHistory} from "../../../../store/actions/Dice/diceActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Table} from "../../../../components/Table/Table";
import { $t } from '../../../../lib/i18n';
import dateformat from 'dateformat'

export const DiceResults = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiceHistory(token, {pageSize: 100000, pageNumber: 0}))
  }, [])

  const data = useSelector((state: any) => state.diceReducer.history).map((item: any) => {
    return {
      name: item.userName,
      bet: `${parseFloat(item.bet.toFixed(8))} BTC`,
      chance: `${item.chance}%`,
      own: item.chance + 1,
      generated: item.hiddenNumber,
      result: item.userWin,
      profit: `${parseFloat(item.gain.toFixed(8))} BTC`,
      date: dateformat(new Date(item.playDate).toString(), "d.mm.yyyy, hh:MM"),
      hash: item.hash,
    }
  })

  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Bet',
      accessor: 'bet'
    },
    {
      Header: 'Chance',
      accessor: 'chance'
    },
    {
      Header: 'Your number',
      accessor: 'own'
    },
    {
      Header: 'Generated number',
      accessor: 'generated'
    },
    {
      Header: 'Result',
      accessor: 'result',
      Cell: ({row: {original}}: any) => (
          <div className={original.result ? 'success' : 'danger'}>
            {$t(original.result ? 'Win' : 'Lose')}
          </div>
      )
    },
    {
      Header: 'Profit',
      accessor: 'profit'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Hash',
      accessor: 'hash',
      Cell: ({row: {original}}: any) => (
          <div className={'table-hidden'}>
            {$t(`${original.hash.slice(0, 10)}...`)}

            <span className={'table-hidden__full'}>
                  {$t(original.hash)}
            </span>
          </div>
      )
    },
  ]

  return (
    <Card className={'history-card'} title={'Games History'}>
      <Table
          data={data}
          columns={columns}
      />
    </Card>
  )
}