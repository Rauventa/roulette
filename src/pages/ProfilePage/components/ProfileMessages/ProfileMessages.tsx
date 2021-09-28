import React, {useContext, useEffect, useState} from 'react';

import './ProfileMessages.scss';

import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import { Card } from '../../../../components/Card/Card';
import {Input} from "../../../../components/Input/Input";
import { Button } from '../../../../components/Button/Button';
import { t } from '../../../../lib/i18n';

export const ProfileMessages = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const messages = useSelector((state: any) => state.profileReducer.messages)

  const fetchData = async () => {
    dispatch(getMessages(token))
  }

  const [formMessage, setFormMessage] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, []);

  const handleChangeMessage = (value: string) => {
    setFormMessage(value)
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
                <div className={'profile-messages__content_message-text'}>
                  text
                </div>
              </div>
            )
          })}
        </div>
      </Card>
      <Card className={'profile-messages_send'}>
        <Input
          placeholder={'Message'}
          type={'text'}
          value={formMessage}
          onChange={(value) => handleChangeMessage(value)}
        />
        <Button primary>
          {t('Send')}
        </Button>
      </Card>
    </div>
  )
}