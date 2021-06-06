import React from 'react';
import './AppLayout.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import {RootRouter} from "../../routers/RootRouter/RootRouter";

export const AppLayout = ({

}) => {
  return (
   <div className={'layout'}>
     <Header />
     <div className="layout__container">
       <RootRouter />
     </div>
     <Footer />
   </div>
  )
}