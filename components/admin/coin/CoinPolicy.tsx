import { useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/coin/CoinPolicy.module.scss';
import { IcoinPolicy } from 'types/admin/adminCoinTypes';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

const coinPolicyTableTitle: { [key: string]: string } = {
  attendance: '출석 획득',
  normal: '일반게임 획득',
  rankWin: '랭크게임 승리 획득',
  rankLose: '랭크게임 패배 획득',
  edit: '정책 변경',
};

const tableColumnName = ['attendance', 'normal', 'rankWin', 'rankLose', 'edit'];

function CoinPolicy() {
  const inputRef = useRef<any>([]);
  const setModal = useSetRecoilState(modalState);

  // inputRef 적용
  const editCoinPolicy = (coinPolicy: IcoinPolicy) => {
    setModal({
      modalName: 'ADMIN-COINPOLICY_EDIT',
      coinPolicy: coinPolicy,
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell key={idx}>{coinPolicyTableTitle[column]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {tableColumnName
                .slice(0, 4)
                .map((column: string, index: number) => (
                  <TableCell key={index}>
                    <input
                      key={index}
                      type='number'
                      ref={(el) => {
                        inputRef.current[index] = el;
                      }}
                    ></input>
                  </TableCell>
                ))}
              <TableCell>
                <button
                  onClick={() => {
                    editCoinPolicy({
                      attendance: inputRef.current[0]?.value,
                      normal: inputRef.current[1]?.value,
                      rankWin: inputRef.current[2]?.value,
                      rankLose: inputRef.current[3]?.value,
                    });
                  }}
                >
                  등록
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CoinPolicy;
