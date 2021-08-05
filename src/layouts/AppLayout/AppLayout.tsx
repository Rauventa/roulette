import React from 'react';
import './AppLayout.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import {ErrorModal} from "../../components/ErrorModal/ErrorModal";
import {useSelector} from "react-redux";
import Container from "react-modal-promise";

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({
  children,
}: AppLayoutProps) => {

  const modal = useSelector((state: any) => state.modalReducer.errorModal)

  return (
    <>
      {modal ?
        <ErrorModal /> : null
      }
      <div className={'layout'}>
        <div className="layout__container">
          <Header />
          <div className="layout__modal">
            <Container />
          </div>
          <div className="layout__content">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}