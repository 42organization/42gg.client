import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';


const coinPolicyTableTitle: { [key: string]: string} = {
    attendance : '출석 획득 코인',
    normal : '일반게임 획득 코인',
    rankWin : '랭크게임 승리 획득 코인',
    rankLose : '랭크게임 패배 획득 코인'
}



function CoinPolicy () {

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
                                    {coinPolicyTableTitle[content]}
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

export default CoinPolicy;