import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/admin/coin/CoinPolicy.module.scss';

const tableTitle: { [key: string]: string } = {
  attendance: '출석 획득',
  normal: '일반게임 획득',
  rankWin: '랭크게임 승리 획득',
  rankLose: '랭크게임 패배 획득',
  edit: '정책 등록',
};

function CoinPolicy() {
  const attendanceRef = useRef<HTMLInputElement>(null);
  const normalRef = useRef<HTMLInputElement>(null);
  const rankWinRef = useRef<HTMLInputElement>(null);
  const rankLoseRef = useRef<HTMLInputElement>(null);
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const editCoinPolicy = () => {
    const attendance = Number(attendanceRef.current?.value);
    const normal = Number(normalRef.current?.value);
    const rankWin = Number(rankWinRef.current?.value);
    const rankLose = Number(rankLoseRef.current?.value);

    if (attendance <= 0 || normal <= 0 || rankWin <= 0 || rankLose < 0) {
      setSnackBar({
        toastName: 'edit coinpolicy',
        severity: 'error',
        message: '유효하지 않은 값입니다.',
        clicked: true,
      });
    } else {
      setModal({
        modalName: 'ADMIN-COINPOLICY_EDIT',
        coinPolicy: {
          attendance: attendance,
          normal: normal,
          rankWin: rankWin,
          rankLose: rankLose,
        },
      });
    }
  };

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table className={styles.table} aria-label='customized table'>
        <AdminTableHead tableName={'coinPolicy'} table={tableTitle} />
        <TableBody className={styles.tableBody}>
          <TableRow className={styles.tableRow}>
            <TableCell className={styles.tableBodyItem}>
              <input type='number' ref={attendanceRef} />
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <input type='number' ref={normalRef} />
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <input type='number' ref={rankWinRef} />
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <input type='number' ref={rankLoseRef} />
            </TableCell>
            <TableCell className={styles.tableBodyItem}>
              <button
                className={styles.editBtn}
                onClick={() => editCoinPolicy()}
              >
                등록
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoinPolicy;
