import React, {useContext, useEffect, useState} from 'react';
import './RatingPage.scss';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {JackpotRating} from "./components/JackpotRating";
import {MaxGamesRating} from "./components/MaxGamesRating";
import {LuckRating} from "./components/LuckRating";
import {useDispatch, useSelector} from "react-redux";
import {getRating} from "../../store/actions/Stats/statsActions";
import {AuthContext} from "../../context/AuthContext";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import DefaultIcon from "./img/default.png";
import {$t} from "../../lib/i18n";

export const RatingPage = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const rating = useSelector((state: any) => state.statsReducer.rating)

  const fetchData = async () => {
    setLoader(true)
    try {
      await dispatch(getRating(token))
    } catch (e) {
      console.log(e)
    }

    setLoader(false)
  }

  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
  }, []);

  const columns = [
    {
      accessor: 'id',
      Cell: ({row: {original}}: any) => (
        <div className={'white-text'}>
          {original.id}
        </div>
      )
    },
    {
      accessor: 'nickname',
      Cell: ({row: {original}}: any) => (
        <div className={'table-user'}>
          <div className={'table-user__icon'}>
            {original.avatar ?
              <img src={original.icon} alt="user icon"/> :
              <img src={DefaultIcon} alt="user icon"/>
            }
          </div>
          <div className="table-user__name white-text">
            {$t(original.nickname)}
          </div>
        </div>
      )
    },
    {
      accessor: 'value',
      Cell: ({row: {original}}: any) => (
        <div>
          {parseFloat(Number(original.value).toFixed(3))}
        </div>
      )
    },
  ]

  return (
    <div className={'rating-page'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <StatsRow />

      <div className="rating-page__content">
        <JackpotRating
          data={rating?.topJackpot}
          columns={columns}
        />
        <MaxGamesRating
          data={rating?.maxGames}
          columns={columns}
        />
        <LuckRating
          data={rating?.topLuck}
          columns={columns}
        />
      </div>
    </div>
  )
}