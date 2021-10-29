//@ts-nocheck
import React from 'react';
import './Table.scss';
import { useTable, usePagination } from 'react-table'
import {Button} from "../Button/Button";
import {useTranslation} from "react-i18next";

interface TableProps {
    className?: string,
    data: any,
    columns: any,
    noPagination?: boolean,
    pageSize?: number,
    noHeader?: boolean,
    noContentMessage?: string,
    onPaginationClick?: (pageIndex: any) => void,
}

export const Table = ({
    className,
    data,
    columns,
    noPagination,
    pageSize,
    noHeader,
    noContentMessage,
    onPaginationClick
}: TableProps) => {

    const {t} = useTranslation()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: pageSize || 20 }}, usePagination)

    const paginationClickHandler = (index: number, iterator: string) => {

        if (iterator === 'next') {
            nextPage()
        }

        if (iterator === 'prev') {
            previousPage()
        }

        if (iterator === 'start') {
            gotoPage(0)
        }

        if (iterator === 'end') {
            gotoPage(pageCount - 1)
        }

        if (onPaginationClick) {
            onPaginationClick(index)
        }
    }

    return (
        <div className={'table-backdrop'}>
            {data.length ?
              <table {...getTableProps()} className={`table ${className || ''}`}>
                  {!noHeader ?
                    <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{t(`${column.render('Header')}`)}</th>
                          ))}
                      </tr>
                    ))}
                    </thead> : null
                  }
                  <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                      )
                  })}
                  </tbody>
              </table>
              :
              <div className={'table-no-data text-secondary'}>
                  {t(noContentMessage || 'Empty here')}
              </div>
            }

            {!noPagination && pageCount > 1 ?
                <div className="pagination">
                    <Button dark onClick={() => paginationClickHandler(pageIndex - 1, 'start')} disabled={!canPreviousPage}>
                        {'<<'}
                    </Button>{' '}
                    <Button dark onClick={() => paginationClickHandler(pageIndex - 1, 'prev')} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>{' '}
                    <Button dark onClick={() => paginationClickHandler(pageIndex + 1, 'next')} disabled={!canNextPage}>
                        {'>'}
                    </Button>{' '}
                    <Button dark onClick={() => paginationClickHandler(pageIndex + 1, 'end')} disabled={!canNextPage}>
                        {'>>'}
                    </Button>{' '}
                    <span className={'text-secondary'}>
                    Page{' '}
                        <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                </div> : null
            }
        </div>
    )
}