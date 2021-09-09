import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {Table} from "../../components/Table/Table";
import {getFaucetHistory} from "../../store/actions/Faucet/faucetActions";
import {config} from "../../config/config";
import DefaultIcon from "../DiceResults/img/default.png";
import {$t} from "../../lib/i18n";
import {Card} from "../../components/Card/Card";
import {currencyValueChanger} from "../../lib/numberRefractor";
import {getTicker} from "../../lib/tickers";

export const FaucetResults = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const fetchData = async () => {
     await dispatch(getFaucetHistory(token))
  }

  useEffect(() => {
    fetchData()
  }, []);

  const data = useSelector((state: any) => state.faucetReducer.history)
  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  console.log(data)

  const columns = [
    {
      Header: 'Name',
      accessor: 'userName',
      Cell: ({row: {original}}: any) => (
        <div className={'table-user'}>
          <div className={'table-user__icon'}>
            {original.userAvatarUrl ?
              <img src={`${config.apiPhotoPrefixUrl}/${original.userAvatarUrl}`} alt="user icon"/> :
              <img src={DefaultIcon} alt="user icon"/>
            }
          </div>
          {original.userName === '[Hidden]' ?
            <div className="table-user__name hidden-nickname">
              {$t('Hidden')}
            </div> :
            <div className="table-user__name">
              {$t(original.userName)}
            </div>
          }
        </div>
      )
    },
    {
      Header: 'Gain',
      accessor: 'gain',
      Cell: ({row: {original}} : any) => (
        <div>
          {$t(`${currencyValueChanger(currency, rate, original.gain)} ${getTicker(currency)}`)}
        </div>
      )
    },
    {
      Header: 'Win number',
      accessor: 'winNumber'
    }
  ]

  return (
    <Card title={'History'}>
      <Table
        data={data}
        columns={columns}
        pageSize={10}
      />
    </Card>
  )
}