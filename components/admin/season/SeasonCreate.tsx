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
import instance from 'utils/axios';

interface SeasonCreateInfo {
  seasonName: string;
  startTime: Date;
  startPpp: number;
  pppGap: number;
  mode: string;
}

export default function SeasonCreate() {
  const [seasonInfo, setSeasonInfo] = useState<SeasonCreateInfo>({
    seasonName: '',
    startTime: new Date(),
    startPpp: 0,
    pppGap: 0,
    mode: 'both',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonInfo({ ...seasonInfo, [name]: value });
  };

  const postHandler = async () => {
    try {
      await instance.post(`/pingpong/admin/season`, seasonInfo);
      alert('SUCCESS');
    } catch (e: any) {
      alert(e.response?.data.code);
    }
  };

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
                  type='datetime-local'
                  name='startTime'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='number'
                  name='startPpp'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <input
                  type='number'
                  name='pppGap'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell>
                <select name='mode' onChange={inputChangeHandler}>
                  <option value='both'>both</option>
                  <option value='rank'>rank</option>
                  <option value='normal'>normal</option>
                </select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.BtnContainer}>
        <button onClick={postHandler}>생성</button>
      </div>
    </div>
  );
}
