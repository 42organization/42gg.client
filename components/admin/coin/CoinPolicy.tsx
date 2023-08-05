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

const coinPolicyTableTitle: { [key: string]: string } = {
  attendance: '출석 획득',
  normal: '일반게임 획득',
  rankWin: '랭크게임 승리 획득',
  rankLose: '랭크게임 패배 획득',
  register: '정책 등록',
};

const tableColumnName = [
  'attendance',
  'normal',
  'rankWin',
  'rankLose',
  'register',
];

function CoinPolicy() {
  const inputRef = useRef<null[] | HTMLDivElement[]>([]);

  // inputRef 받아와서 요청 보내는 handler 추가 필요
  // const putCoinPolicyHandler

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
                <button>등록</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CoinPolicy;
