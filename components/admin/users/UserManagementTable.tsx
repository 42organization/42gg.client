import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import instance from 'utils/axios';
import PageNation from 'components/Pagination';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/users/UserManagementTable.module.scss';

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
  const setModal = useSetRecoilState(modalState);

  const tableTitle: { [key: string]: string } = {
    id: 'ID',
    roleType: '권한',
    intraId: 'Intra ID',
    statusMessage: '상태 메시지',
    etc: '기타',
  };

  const buttonList: string[] = [styles.detail, styles.penalty];

  const handleButtonAction = (
    buttonName: string,
    userId: number,
    intraId: string
  ) => {
    switch (buttonName) {
      case '자세히':
        setModal({ modalName: 'ADMIN-PROFILE', userId });
        break;
      case '패널티 부여':
        setModal({ modalName: 'ADMIN-PENALTY', intraId });
        break;
    }
  };

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getAllUserInfo = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/users?page=${currentPage}`
      );
      setUserManagements({
        userInfoList: res.data.userSearchAdminDtos,
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS06');
    }
  }, [currentPage]);

  const getUserInfo = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/users?q=${intraId}&page=${currentPage}`
      );
      setUserManagements({
        userInfoList: res.data.userSearchAdminDtos,
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS05');
    }
  }, [intraId, currentPage]);

  useEffect(() => {
    intraId ? getUserInfo() : getAllUserInfo();
  }, [intraId, getAllUserInfo, getUserInfo]);

  // ? 검색결과가 없을 때, currentPage === 0 인가?
  if (userManagements.currentPage === 0) return <div>loading...</div>;

  return (
    <>
      <div className={styles.userManagementWrap}>
        <div className={styles.header}>
          <span className={styles.title}>유저 관리</span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='UserManagementTable'>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                {tableFormat['userInfo'].columns.map((columnName) => (
                  <TableCell
                    className={styles.tableHeaderItem}
                    key={columnName}
                  >
                    {tableTitle[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {userManagements.userInfoList.map((userInfo: IUser) => (
                <TableRow key={userInfo.id} className={styles.tableRow}>
                  {tableFormat['userInfo'].columns.map((columnName: string) => {
                    return (
                      <TableCell
                        className={styles.tableBodyItem}
                        key={columnName}
                      >
                        {columnName !== 'etc'
                          ? userInfo[columnName as keyof IUser]
                          : tableFormat['userInfo'].etc?.value.map(
                              (buttonName: string, index: number) => (
                                <button
                                  key={buttonName}
                                  className={`${styles.button} ${buttonList[index]}`}
                                  onClick={() =>
                                    handleButtonAction(
                                      buttonName,
                                      userInfo.id,
                                      userInfo.intraId
                                    )
                                  }
                                >
                                  {buttonName}
                                </button>
                              )
                            )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pageNationContainer}>
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
