import React, {useContext, useState} from 'react';
import './DepositContainer.scss';
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {SelectDeposit} from "../../pages/DepositPage/components/SelectDeposit/SelectDeposit";
import {ShowDeposit} from "../../pages/DepositPage/components/ShowDeposit/ShowDeposit";
import {AuthContext} from "../../context/AuthContext";
import {axiosClient} from "../../utils/axiosClient";

export const DepositContainer = () => {

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
    </div>
  )
}