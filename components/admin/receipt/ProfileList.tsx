import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const profileTableTitle: { [key: string]: string } = {
  id: 'ID',
  usageTime: '사용 시간',
  userIntraId: '사용자 id',
  content: '현재 이미지',
  status: '사용 상태',
  delete: '삭제',
};

function ProfileList() {
  const test = [
    'id',
    'usageTime',
    'userIntraId',
    'content',
    'status',
    'delete',
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {test.map((content, idx) => (
                <TableCell key={idx}>{profileTableTitle[content]}</TableCell>
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

export default ProfileList;
