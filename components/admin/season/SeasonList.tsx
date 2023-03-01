import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/season/SeasonList.module.scss';
import { tableFormat } from 'constants/admin/table';
import { useEffect, useState } from 'react';
import instance from 'utils/axios';

interface ISeason {
  seasonId: number;
  seasonName: string;
  startTime: Date;
  endTime: Date;
  startPpp: number;
  pppGap: number;
  mode: string;
  status: number;
}

interface ISeasonTable {
  mode: string;
  seasonList: ISeason[];
}

export default function SeasonList() {
  const [seasonList, setSeasonList] = useState<ISeasonTable>({
    mode: '',
    seasonList: [],
  });

  const getSeasonList = async () => {
    try {
      const res = await instance.get(`pingpong/admin/season/both`);
      console.log(res.data);
      setSeasonList({ ...res.data });
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSeasonList();
  }, []);

  return (
    <div className={styles.container}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableFormat['season'].columns.map((columnName) => (
                <TableCell className={styles.tableHeaderItem} key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {seasonList.seasonList.map((seasonL: ISeason, index: number) => (
              <TableRow key={index}>
                {tableFormat['season'].columns.map(
                  (columnName, index: number) => (
                    <TableCell className={styles.tableBodyItem} key={index}>
                      {columnName === 'startTime' || columnName === 'endTime'
                        ? seasonL[columnName as keyof ISeason]
                            ?.toString()
                            .replace('T', ' ')
                        : seasonL[columnName as keyof ISeason]?.toString()}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
