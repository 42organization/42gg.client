import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { ISeasonEditInfo } from 'types/seasonTypes';
import { instanceInManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/admin/season/SeasonCreate.module.scss';

const tableTitle: { [key: string]: string } = {
  seasonName: '시즌 이름',
  startTime: '시작 시간',
  startPpp: '시작 PPP',
  pppGap: '제한 PPP',
  create: '생성',
};

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
          <AdminTableHead tableName={'seasonCreate'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            <TableRow>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='text'
                  name='seasonName'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='datetime-local'
                  name='startTime'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='number'
                  name='startPpp'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <input
                  type='number'
                  name='pppGap'
                  onChange={inputChangeHandler}
                />
              </TableCell>
              <TableCell className={styles.tableBodyItem}>
                <div className={styles.BtnContainer}>
                  <button onClick={postHandler}>생성</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
