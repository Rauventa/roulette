import React, {useContext, useEffect, useState} from 'react';

import './UserStats.scss';

import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {getUserStats} from "../../store/actions/Profile/profileActions";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {UserStatsItem} from "./components/UserStatsItem";

export const UserStats = () => {

    const {token} = useContext(AuthContext)

    const dispatch = useDispatch()

    const [loader, setLoader] = useState<boolean>(false)

    const stats = useSelector((state: any) => state.profileReducer.userStats)

    const fetchData = async () => {
        setLoader(true)

        await dispatch(getUserStats(token))

        setLoader(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const data = Object.entries(stats).map((item: any) => {
        return {
            title: item[0],
            value: item[1]
        }
    })

    return (
        <div className={'user-stats'}>

            <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
                <Spinner />
            </CSSTransition>

            {data.map((item: any, index: number) => {
                return (
                    <UserStatsItem
                        key={index}
                        title={item.title}
                        value={item.value}
                    />
                )
            })}

        </div>
    )
}