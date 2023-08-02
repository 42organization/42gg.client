import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';


const megaPhoneTableTitle: { [key: string]: string } = {
    id: 'ID',
    usageTime: '사용 시간',
    userIntraId: '사용자 id',
    content: '내용',
    status: '사용 상태',
    delete: '삭제'
}

function MegaphoneList () {

    const test = [    'id',
    'usageTime',
    'userIntraId',
    'content',
    'status',
    'delete']

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            {test.map((content, idx) => (
                                <TableCell key={idx}>
                                    {megaPhoneTableTitle[content]}
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

export default MegaphoneList;
