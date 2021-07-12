import React from 'react';
import {Card} from "../../../components/Card/Card";
import {TableRatingProps} from "../../../interfaces/rating/IRating";
import {ReactComponent as JackpotIcon} from "../img/btc-ico.svg";
import {Table} from "../../../components/Table/Table";

export const LuckRating = ({
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
          title={'Top Luck'}
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