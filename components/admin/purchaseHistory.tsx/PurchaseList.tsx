import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';


const purchaseListTableTitle: { [key: string]: string } = {
    id: 'ID',
    transactionTime: '구매 시간',
    buyerIntraId: '구매자 id',
    itemName: '이름',
    itemStatus: '사용 상태',
    itemSetting: '설정'
}

function PurchaseList () {

    const test = [    'id',
    'transactionTime',
    'buyerIntraId',
    'itemName',
    'itemStatus',
    'itemSetting']

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            {test.map((content, idx) => (
                                <TableCell key={idx}>
                                    {purchaseListTableTitle[content]}
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

export default PurchaseList;
