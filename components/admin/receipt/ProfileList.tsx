import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { useEffect, useState } from 'react';
import { Iprofile, IprofileTable } from 'types/admin/adminReceiptType';
import { getFormattedDateToString } from 'utils/handleTime';

const profileTableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '시간',
  intraId: '사용자',
  imageUrl: '현재 이미지',
  delete: '삭제',
};

const tableColumnName = ['profileId', 'data', 'intraId', 'imageUrl', 'delete'];

function ProfileList() {
  const [profileData, setProfileData] = useState<IprofileTable>({
    profileList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가

  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  const getProfileHandler = useMockAxiosGet<any>({
    url: `/admin/images?page=${currentPage}&size=5`,
    setState: (data) => {
      setProfileData({
        profileList: data.profileList.map((profile: Iprofile) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(profile.date)
          );
          return {
            ...profile,
            date: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: data.totalPage,
        currentPage: currentPage,
      });
    },
    err: 'HJ04',
    type: 'setError',
  });

  useEffect(() => {
    getProfileHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((columnName, idx) => (
                <TableCell key={idx}>{profileTableTitle[columnName]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {profileData.profileList.le}

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
