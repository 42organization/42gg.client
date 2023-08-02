import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';



const coinPolicyHistoryTableTitle: { [key: string]: string} = {
    coinpollicyId : '정책 id',
    createUser : '등록 유저',
    attendance : '출석 획득 코인',
    nomal : '일반게임 획득 코인',
    rank_win : '랭크게임 승리 획득 코인',
    rank_lose : '랭크게임 패배 획득 코인',
    created_at : '등록 날짜'
}


function CoinPolicyHistory () {

    const test = ['attendance', 'normal', 
                'rankWin', 'rankLose'];

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
    )
}

export default CoinPolicyHistory;