import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const coinPolicyHistoryTableTitle: { [key: string]: string } = {
  coinPolicyId: '정책 id',
  createUser: '등록 유저',
  attendance: '출석 획득',
  nomal: '일반게임 획득',
  rank_win: '랭크게임 승리 획득',
  rank_lose: '랭크게임 패배 획득',
  created_at: '등록 날짜',
};

function CoinPolicyHistory() {
  const test = [
    'coinPolicyId',
    'createUser',
    'attendance',
    'normal',
    'rank_win',
    'rank_lose',
    'created_at',
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {test.map((content, idx) => (
                <TableCell key={idx}>
                  {coinPolicyHistoryTableTitle[content]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>비어있습니다</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CoinPolicyHistory;
