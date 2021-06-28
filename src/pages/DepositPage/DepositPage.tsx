import React, {useContext, useState} from 'react';
import './DepositPage.scss'
import { $t } from '../../lib/i18n';
import {SelectDeposit} from "./components/SelectDeposit/SelectDeposit";
import {ShowDeposit} from "./components/ShowDeposit/ShowDeposit";
import {axiosClient} from "../../utils/axiosClient";
import {AuthContext} from "../../context/AuthContext";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";

export const DepositPage = () => {

  const [page, setPage] = useState<string>('select')
  const [code, setCode] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)

  const {token} = useContext(AuthContext)

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

  return (
    <div className={'deposit-page'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="page-title">
        {$t('Deposit')}
      </div>

      {page === 'select' ?
        <SelectDeposit
          onChangePage={handleChangePage}
        /> :
        <ShowDeposit
          onChangePage={handleChangePage}
          code={code}
        />
      }
    </div>
  )
}