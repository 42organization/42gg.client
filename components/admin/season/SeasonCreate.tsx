import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ISeasonEditInfo } from 'types/seasonTypes';
import { instanceInManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
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

export default function SeasonCreate() {
  const [seasonInfo, setSeasonInfo] = useState<ISeasonEditInfo>({
    seasonName: '',
    startTime: new Date(),
    startPpp: 0,
    pppGap: 0,
  });
  const setSnackBar = useSetRecoilState(toastState);

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
      await instanceInManage.post(`/seasons`, seasonInfo);
      setSnackBar({
        toastName: 'Season Create',
        severity: 'success',
        message: `성공적으로 생성되었습니다! `,
        clicked: true,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'Create Error',
        severity: 'error',
        message: `Post 실패 ${e.response?.data.code}`,
        clicked: true,
      });
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
