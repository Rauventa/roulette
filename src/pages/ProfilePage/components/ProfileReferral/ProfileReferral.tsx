import React, {useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getReferrals, getReferralsStatistic} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";

export const ProfileReferral = () => {

    const dispatch = useDispatch()

    const {token, userId} = useContext(AuthContext)

    useEffect(() => {
      fetchData()
    }, []);

    const fetchData = async () => {
      await dispatch(getReferrals(token))
      await dispatch(getReferralsStatistic(token, userId))
    }

    return (
        <div>
            ProfileReferral
        </div>
    )
}