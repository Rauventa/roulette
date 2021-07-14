import React from 'react';
import { Card } from '../../../components/Card/Card';
import {ReactComponent as JackpotIcon} from "../img/card-1.svg";
import {Table} from "../../../components/Table/Table";
import {TableRatingProps} from "../../../interfaces/rating/IRating";

export const JackpotRating = ({
  data,
  columns
}: TableRatingProps) => {

  //@ts-ignore
  const defaultData = data?.map((item: any, index: number) => {
    return {
      ...item,
      id: index + 1
    }
  }) || []

  return (
    <Card
      title={'Top Jackpot'}
      icon={
        <JackpotIcon />
      }
    >
      <Table
        data={defaultData}
        columns={columns}
        noPagination
        noHeader
      />
    </Card>
  )
}