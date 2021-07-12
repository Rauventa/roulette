export interface TableRatingProps {
  data: IRating,
  columns: any
}

export interface IRating {
  nickname: string,
  avatar: any,
  value: string | number
}