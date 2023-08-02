import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';



const changeHistoryTableTitle: { [key: string]: string} = {
    itemName: '아이템 이름',
    modifiedInfo: '수정된 정보',
    modifiedBy: '수정한 사람',
    modifiedAt: '수정된 날짜'
}


function ChangeHistory () {

    const test = ['itemName', 'modifiedInfo', 
                'modifiedBy', 'modifiedAt'];

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            {test.map((content, idx) => (
                                <TableCell key={idx}>
                                    {changeHistoryTableTitle[content]}
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

export default ChangeHistory;