import React from 'react';
import {Card} from "../../../components/Card/Card";
import {TableRatingProps} from "../../../interfaces/rating/IRating";
import {ReactComponent as LuckIcon} from "../img/card-4.svg";
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
              <LuckIcon />
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