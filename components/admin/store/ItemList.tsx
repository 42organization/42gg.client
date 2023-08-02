import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';



function ItemList () {

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label='customized table'>
                    {/* <TableHead>
                        <TableRow>
                            {test.map((content, idx) => (
                                <TableCell key={idx}>
                                    {changeHistoryTableTitle[content]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead> */}
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

export default ItemList;