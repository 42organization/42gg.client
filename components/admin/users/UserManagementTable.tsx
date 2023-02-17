import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PageNation from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { tableColumnNames } from 'types/admin/tableTypes';
import instance from 'utils/axios';
import AdminSearchBar from '../common/AdminSearchBar';

interface IUser {
  id: number;
  intraId: string;
  statusMessage: string;
  roleType: string; // TODO : type으로 변경
}

interface IUserTable {
  userInfoList: IUser[];
  totalPage: number;
  currentPage: number;
}

export default function UserManagementTable() {
  const [userManagements, setUserManagements] = useState<IUserTable>({
    userInfoList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');

  const tableTitle: { [key: string]: string } = {
    id: 'Id',
    roleType: '권한',
    intraId: 'Intra ID',
    statusMessage: '상태 메시지',
    etc: '기타',
  };

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getAllUserInfo = useCallback(async () => {
    try {
      const res = await instance.get('pingpong/admin/users?page=1');
      console.log(res.data);
      setUserManagements({
        userInfoList: res.data.userSearchAdminDtos,
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS06');
    }
  }, []);

  useEffect(() => {
    getAllUserInfo();
  }, [intraId, getAllUserInfo]);

  // ? 검색결과가 없을 때, currentPage === 0 인가?
  if (userManagements.currentPage === 0) return <div>loading...</div>;

  return (
    <>
      <div>
        <div>
          <span>유저 관리</span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer component={Paper}>
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                {tableColumnNames['userInfo'].columns.map((columnName) => (
                  <TableCell key={columnName}>
                    {tableTitle[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userManagements.userInfoList.map((userInfo: IUser) => (
                <TableRow key={userInfo.id}>
                  {tableColumnNames['userInfo'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell key={index}>
                          {columnName !== 'etc'
                            ? userInfo[columnName as keyof IUser]
                            : tableColumnNames['userInfo'].etc.value.map(
                                (buttonName, index) => (
                                  <button key={index}>{buttonName}</button>
                                )
                              )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <PageNation
            curPage={userManagements.currentPage}
            totalPages={userManagements.totalPage}
            pageChangeHandler={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
