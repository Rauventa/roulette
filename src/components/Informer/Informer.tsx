import React, {useEffect} from "react";
import './Informer.scss'
import {useDispatch, useSelector} from "react-redux";
import {updateInformer} from "../../store/actions/Application/applicationActions";

export const Informer = () => {

  const dispatch = useDispatch()

  const informerData = useSelector((state: any) => state.applicationReducer.informerData)
  const {message, active, type, timeout} = informerData

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        dispatch(updateInformer({active: false}))
      }, timeout*1000 || 3000);
      return () => clearTimeout(timer)
    }
  }, [active]);

  if (active) {
    return (
      <div className={`informer ${type}`}>
        {message}
      </div>
    )
  } else return null
}