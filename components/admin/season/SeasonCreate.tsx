import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/season/SeasonCreate.module.scss';
import React, { useState } from 'react';

interface SeasonCreateInfo {
  seasonName: string;
  start_time: Date;
  start_ppp: number;
  ppp_gap: number;
  mode: string;
}

export default function SeasonCreate() {
  const [seasonInfo, setSeasonInfo] = useState<SeasonCreateInfo>({
    seasonName: '',
    start_time: new Date(),
    start_ppp: 0,
    ppp_gap: 0,
    mode: '',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setSeasonInfo({ ...seasonInfo, [name]: value });

  return (
    <div className={styles.container}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {Object.keys(seasonInfo).map((columnName) => (
                <TableCell className={styles.tableHeaderItem} key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            <TableRow>
              <TableCell>
                <input
                  type='text'
                  name='seasonName'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='date'
                  name='seasonName'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='number'
                  name='startTime'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='number'
                  name='seasonName'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='texts'
                  name='seasonName'
                  onChange={inputChangeHandler}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
