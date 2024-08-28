import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { IUser, IUserTable } from 'types/admin/takgu/adminUserTypes';
import { instanceInManage } from 'utils/axios';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import AdminSearchBar from 'components/admin/takgu/common/AdminSearchBar';
import {
  AdminAgendaTableHead,
  AdminEmptyItem,
} from 'components/admin/takgu/common/AdminTable';
import TicketForm from 'components/agenda/Form/TicketForm';
import UserForm from 'components/agenda/Form/userForm';
import { useModal } from 'components/agenda/modal/useModal';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/takgu/users/UserManagementTable.module.scss';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  roleType: '권한',
  intraId: 'Intra ID',
  etc: '기타',
};

export default function UserTable() {
  const [userManagements, setUserManagements] = useState<IUserTable>({
    userInfoList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const { openModal } = useModal();
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, intraId: string) => {
    switch (buttonName) {
      case '프로필':
        openModal({
          type: 'modify',
          title: '프로필 수정',
          description: '변경 후 수정 버튼을 눌러주세요.',
          FormComponent: UserForm,
          stringKey: intraId,
        });
        break;

      case '티켓발급':
        openModal({
          type: 'modify',
          title: '티켓 발급',
          description: '티켓을 발급하시겠습니까?',
          FormComponent: TicketForm,
          stringKey: intraId,
        });
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
            <AdminAgendaTableHead tableName={'user'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {userManagements.userInfoList.length > 0 ? (
                userManagements.userInfoList.map((userInfo: IUser) => (
                  <TableRow key={userInfo.id} className={styles.tableRow}>
                    {agendaTableFormat['user'].columns.map(
                      (columnName: string) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={columnName}
                          >
                            {columnName !== 'etc'
                              ? userInfo[columnName as keyof IUser]
                              : agendaTableFormat['user'].etc?.value.map(
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
