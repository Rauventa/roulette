import React, {useState} from 'react';
import './ProfileHistory.scss';
import {Select} from "../../../../components/Select/Select";
import {DiceResults} from "../../../../containers/DiceResults/DiceResults";
import {HiloResults} from "../../../../containers/HiloResults/HiloResults";

export const ProfileHistory = () => {

    const initialHistoryTypes = [
        {
            label: 'Dice',
            value: 'dice'
        },
        {
            label: 'HiLo',
            value: 'hilo'
        }
    ]

    const [type, setType] = useState<any>(initialHistoryTypes[0])

    const changeHistoryType = (data: any) => {
        setType(data)
    }

    return (
        <div className={'profile-history'}>
            <Select
                options={initialHistoryTypes}
                value={type}
                onChange={(value) => changeHistoryType(value)}
            />

            {type.value === 'dice' ?
              <DiceResults
                type={'me'}
                noTitle
              /> : null
            }

            {type.value === 'hilo' ?
              <HiloResults
                type={'me'}
                noTitle
              /> : null
            }
        </div>
    )
}