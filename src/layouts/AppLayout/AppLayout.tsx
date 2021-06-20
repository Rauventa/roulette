import React from 'react';
import './AppLayout.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({
  children,
}: AppLayoutProps) => {
  return (
   <div className={'layout'}>
       <div className="layout__container">
           <Header />
           <div className="layout__content">
               {children}
           </div>
           <Footer />
       </div>
   </div>
  )
}