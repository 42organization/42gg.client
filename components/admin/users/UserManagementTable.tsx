import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IUser, IUserTable } from 'types/admin/adminUserTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/users/UserManagementTable.module.scss';
import { AdminEmptyItem, AdminTableHead } from '../common/AdminTable';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  roleType: '권한',
  intraId: 'Intra ID',
  statusMessage: '상태 메시지',
  etc: '기타',
};

export default function UserManagementTable() {
  const [userManagements, setUserManagements] = useState<IUserTable>({
    userInfoList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const setModal = useSetRecoilState(modalState);

  const buttonList: string[] = [styles.detail, styles.penalty];

  const handleButtonAction = (buttonName: string, intraId: string) => {
    switch (buttonName) {
      case '자세히':
        setModal({ modalName: 'ADMIN-PROFILE', intraId });
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
      const res = await instanceInManage.get(
        `/users?page=${currentPage}&size=10`
      );
      setUserManagements({
        userInfoList: res.data.userSearchAdminDtos,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS06');
    }
  }, [currentPage]);

  const getUserInfo = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/users?intraId=${intraId}&page=${currentPage}&size=10`
      );
      setUserManagements({
        userInfoList: res.data.userSearchAdminDtos,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS05');
    }
  }, [intraId, currentPage]);

  useEffect(() => {
    intraId ? getUserInfo() : getAllUserInfo();
  }, [intraId, getAllUserInfo, getUserInfo]);

  return (
    <>
      <div className={styles.userManagementWrap}>
        <div className={styles.header}>
          <span className={styles.title}>유저 관리</span>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='UserManagementTable'>
            <AdminTableHead tableName={'userInfo'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {userManagements.userInfoList.length > 0 ? (
                userManagements.userInfoList.map((userInfo: IUser) => (
                  <TableRow key={userInfo.id} className={styles.tableRow}>
                    {tableFormat['userInfo'].columns.map(
                      (columnName: string) => {
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
                      }
                    )}
                  </TableRow>
                ))
              ) : (
                <AdminEmptyItem content={'유저 정보가 비어있습니다'} />
              )}
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
