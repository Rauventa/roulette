import React from 'react';
import {Card} from "../../../components/Card/Card";
import {ReactComponent as JackpotIcon} from "../img/btc-ico.svg";
import {Table} from "../../../components/Table/Table";
import {TableRatingProps} from "../../../interfaces/rating/IRating";

export const MaxGamesRating = ({
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
        title={'Max Games'}
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