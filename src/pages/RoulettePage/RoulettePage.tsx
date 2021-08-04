import React from 'react';
import { Button } from '../../components/Button/Button';
import { $t } from '../../lib/i18n';
import {showModal} from "../../components/Modal/Modal";

export const RoulettePage = () => {

    const handleShow = () => {
        showModal()
    }

  return (
    <div className={'roulette'}>
        <div className="page-title">
            {$t('Roulette')}
        </div>

        <Button onClick={handleShow}>
            hdsfsdf
        </Button>

        <div className={'text-secondary'}>
            {$t('This page stands in development')}
        </div>
    </div>
  )
}