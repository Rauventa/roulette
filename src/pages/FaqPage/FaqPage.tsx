import React, {useContext, useEffect, useState} from 'react';

import './FaqPage.scss';

import {useDispatch, useSelector} from "react-redux";
import {loadFaqQuestions} from "../../store/actions/Application/applicationActions";
import {AuthContext} from "../../context/AuthContext";
import {Card} from "../../components/Card/Card";
import { t } from '../../lib/i18n';
import { Button } from '../../components/Button/Button';
import {TextArea} from "../../components/TextArea/TextArea";

export const FaqPage = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const questions = useSelector((state: any) => state.applicationReducer.faqQuestions)

  const fetchData = async () => {
    await dispatch(loadFaqQuestions(token))
  }

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className={'faq-page'}>

      <div className="page-title">
        {t('FAQ')}
      </div>

      {questions?.map((item: any, index: number) => {
        return (
          <Card title={item.question} key={index}>
            <div className={'faq-page__text'}>
              {item.answer}
            </div>
          </Card>
        )
      })}

      <div className="faq-page__question">
        <Card title={'Ask question'}>
          <TextArea
            value={message}
            placeholder={'Message'}
            onChange={(value: any) => setMessage(value)}
          />
          <Button primary>
            {t('Send')}
          </Button>
        </Card>
      </div>
    </div>
  )
}