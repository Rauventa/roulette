import React from 'react';
import './AppLayout.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import Container from "react-modal-promise";
import {ApiLoader} from "../../HOC/ApiLoader/ApiLoader";
import {Spinner} from "../../components/Spinner/Spinner";
import {CSSTransition} from "react-transition-group";
import {useSelector} from "react-redux";
import {Informer} from "../../components/Informer/Informer";

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({
  children,
}: AppLayoutProps) => {

  const loader = useSelector((state: any) => state.applicationReducer.loader)

  return (
    <ApiLoader>
      <div className={'layout'}>
        <div className="layout__container">

          <CSSTransition in={loader} timeout={300} unmountOnExit classNames="my-node">
            <Spinner />
          </CSSTransition>

          <Informer />

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
    </ApiLoader>
  )
}