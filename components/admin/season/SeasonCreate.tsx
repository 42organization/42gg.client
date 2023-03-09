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
  seasonMode: string;
}

export default function SeasonCreate() {
  const [seasonInfo, setSeasonInfo] = useState<SeasonCreateInfo>({
    seasonName: '',
    startTime: new Date(),
    startPpp: 0,
    pppGap: 0,
    seasonMode: 'BOTH',
  });

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    name === 'startPpp' || name === 'pppGap'
      ? setSeasonInfo({ ...seasonInfo, [name]: parseInt(value) })
      : setSeasonInfo({ ...seasonInfo, [name]: value });
  };

  const postHandler = async () => {
    try {
      console.log(seasonInfo);
      await instance.post(`/pingpong/admin/season`, seasonInfo);
      alert('SUCCESS');
    } catch (e: any) {
      console.log(e);
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
                <select name='seasonMode' onChange={inputChangeHandler}>
                  <option value='BOTH'>BOTH</option>
                  <option value='RANK'>RANK</option>
                  <option value='NORMAL'>NORMAL</option>
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
