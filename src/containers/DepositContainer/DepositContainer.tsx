import React, {useContext, useEffect, useState} from 'react';
import './DepositContainer.scss';

import {ReactComponent as UpArrowIcon} from "./img/up-arrow.svg";
import {ReactComponent as DownArrowIcon} from "./img/down-arrow.svg";

import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {SelectDeposit} from "../../pages/DepositPage/components/SelectDeposit/SelectDeposit";
import {ShowDeposit} from "../../pages/DepositPage/components/ShowDeposit/ShowDeposit";
import {AuthContext} from "../../context/AuthContext";
import {axiosClient} from "../../utils/axiosClient";
import {useDispatch, useSelector} from "react-redux";
import { Table } from '../../components/Table/Table';
import {getPaymentHistory} from "../../store/actions/Balance/balanceActions";
import {config} from "../../config/config";
import {toNormalDate} from "../../lib/dateHelper";
import { Card } from '../../components/Card/Card';
import {currencyValueChanger} from "../../lib/numberRefractor";
import {getTicker} from "../../lib/tickers";
import {useTranslation} from "react-i18next";

export const DepositContainer = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const data = useSelector((state: any) => state.balanceReducer.history).map((item: any, index: number) => {
    return {
      ...item,
      date: toNormalDate(item.createdAt)
    }
  })

  const {t} = useTranslation()

  const [page, setPage] = useState<string>('select')
  const [code, setCode] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoader(true)

    await dispatch(getPaymentHistory(token, {type: 'Unknown', ...config.historyLoadParams}))

    setLoader(false)
  }

  const handleChangePage = async (value: string) => {

    setLoader(true)

    try {
      const response = await axiosClient.get('/Profile/GetDepositWalletAddress', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setCode(response.data.payload)
    } catch (e) {
      console.log(e)
    }

    setLoader(false)
    setPage(value)
  }

  const columns = [
    {
      Header: 'Date/Time',
      accessor: 'date'
    },
    {
      Header: 'Currency',
      accessor: 'currency'
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({row: {original}}: any) =>
          original.type === 'deposit' ? (
              <div className={`table-icon-block success`}>
                <DownArrowIcon />
                {t(`${original.type}`)}
              </div>
          ) : (
              <div className={`table-icon-block danger`}>
                <UpArrowIcon />
                {t(`${original.type}`)}
              </div>
          )
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({row: {original}}: any) => (
          <div>
            {t(`${currencyValueChanger(currency, rate, original.amount)} ${getTicker(currency)}`)}
          </div>
      )
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
  ]

  return (
    <div className={'deposit-container'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      {page === 'select' ?
        <SelectDeposit
          onChangePage={handleChangePage}
        /> :
        <ShowDeposit
          onChangePage={handleChangePage}
          code={code}
        />
      }
      {data.length?
        <div className="deposit-container__history">
          <Card>
            <Table
                data={data}
                columns={columns}
            />
          </Card>
        </div>
      : 
      null
      }
      
    </div>
  )
}