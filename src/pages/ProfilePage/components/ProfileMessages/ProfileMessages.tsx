import React, {useContext, useEffect, useState} from 'react';

import './ProfileMessages.scss';

import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, sendMessage} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import { Card } from '../../../../components/Card/Card';
import {Input} from "../../../../components/Input/Input";
import { Button } from '../../../../components/Button/Button';
import { t } from '../../../../lib/i18n';
import {loaderVisibilityHandler} from "../../../../store/actions/Application/applicationActions";

export const ProfileMessages = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const messages = useSelector((state: any) => state.profileReducer.messages)

  const [formMessage, setFormMessage] = useState<string>('')

  const fetchData = async () => {
    dispatch(getMessages(token))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeMessage = (value: string) => {
    setFormMessage(value)
  }

  const sendMessageHandler = async () => {
    dispatch(loaderVisibilityHandler(true))

    await dispatch(sendMessage(token, {message: formMessage}))
    fetchData()

    setFormMessage('')

    dispatch(loaderVisibilityHandler(false))
  }

  return (
    <div className={'profile-messages__overflow'}>
      <Card
        className={'profile-messages'}
      >
        <div className="profile-messages__content">
          {messages.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`profile-messages__content_message ${item.isFromUser ? 'user-message' : 'support-message'}`}
              >
                <div className="profile-messages__content_container">
                  <div className="profile-messages__content_container-user">
                    {item.isFromUser ? 'You' : 'Support'}
                  </div>
                  <div className={'profile-messages__content_container-text'}>
                    {item.text}
                  </div>
                  <div className="profile-messages__content_container-date">
                    {moment(item.date, 'YYYYMMDD').fromNow()}
                  </div>
                </div>
              </div>
            )
          })}

          {!messages.length ?
              <div className={'text-secondary'}>
                {t('No messages yet')}
              </div> : null
          }
        </div>
      </Card>
      <Card className={'profile-messages_send'}>
        <Input
          placeholder={'Message'}
          type={'text'}
          value={formMessage}
          onChange={(value) => handleChangeMessage(value)}
        />
        <Button primary onClick={sendMessageHandler}>
          {t('Send')}
        </Button>
      </Card>
    </div>
  )
}