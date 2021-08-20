import React, {useContext, useEffect} from 'react';
import './FaucetWins.scss';
import {useDispatch, useSelector} from "react-redux";
import {getFaucetTimeout, getFaucetWins, rollFaucet} from "../../../store/actions/Faucet/faucetActions";
import {AuthContext} from "../../../context/AuthContext";
import {Card} from "../../../components/Card/Card";
import {Table} from "../../../components/Table/Table";
import {$t} from "../../../lib/i18n";
import {currencyValueChanger} from "../../../lib/numberRefractor";
import {getTicker} from "../../../lib/tickers";
import { Button } from '../../../components/Button/Button';

interface FaucetWinsProps {
  onRoll: (value: string) => void
}

export const FaucetWins = ({
  onRoll
}: FaucetWinsProps) => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const data = useSelector((state: any) => state.faucetReducer.wins).map((item: any) => {
    return {
      payout: item.payoutInBtc,
      number: `${item.luckyNumberFrom} - ${item.luckyNumberTo}`
    }
  })

  const fetchData = async () => {
    await dispatch(getFaucetWins(token))
  }

  const handleSubmit = async () => {

    onRoll('rolling')

    setTimeout(async () => {
      await dispatch(rollFaucet(token, currency, rate))
      onRoll('')
    }, 3000)
  }

  useEffect(() => {
    fetchData()
  }, []);

  const columns = [
    {
      Header: 'Lucky Number',
      accessor: 'number',
    },
    {
      Header: 'Payout',
      accessor: 'payout',
      Cell: ({row: {original}} : any) => (
        <div>
          {$t(`${currencyValueChanger(currency, rate, original.payout)} ${getTicker(currency)}`)}
        </div>
      )
    }
  ]

  return (
    <Card className={'faucet-wins-card'}>
      <Table
        data={data}
        columns={columns}
      />

      <Button primary onClick={handleSubmit}>
        {$t('Roll')}
      </Button>
    </Card>
  )
}