import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyPenaltyAdmin, PartyPenaltyTable } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/takgu/admin/table';
import PageNation from 'components/Pagination';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/admin/party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  userIntraId: '유저',
  penaltyType: '패널티 타입',
  message: '내용',
  startTime: '시작 시간',
  penaltyTime: '패널티 시간',
  edit: '수정',
};

export default function AdminCommentReport() {
  const [penaltyInfo, setPenaltyInfo] = useState<PartyPenaltyTable>({
    penaltyList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  useEffect(() => {
    instanceInPartyManage
      .get(`/penalties?page=${currentPage}&size=10`)
      .then((res) => {
        setPenaltyInfo({
          penaltyList: res.data.penaltyList,
          totalPage: res.data.totalPage,
          currentPage: currentPage,
        });
      })
      .catch((error) => {
        setSnackBar({
          toastName: 'GET request',
          message: '댓글신고를 가져오는데 실패했습니다.',
          severity: 'error',
          clicked: true,
        });
      });
  }, [currentPage]);

  const handleAddpenalty = () => {
    setModal({ modalName: 'ADMIN-PARTY_PENALTY' });
  };

  const handleEditpenalty = (partyPenalty?: PartyPenaltyAdmin) => {
    setModal({ modalName: 'ADMIN-PARTY_PENALTY', partyPenalty });
  };

  return (
    <div className={styles.AdminTableWrap}>
      <div className={styles.header}>
        <span className={styles.title}>패널티 리스트</span>
        <button
          onClick={handleAddpenalty}
          className={`${styles.button_1} ${styles.add}`}
        >
          추가
        </button>
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label='UserManagementTable' className={styles.table}>
          <AdminTableHead tableName={'partyPenaltyAdmin'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {penaltyInfo.penaltyList && penaltyInfo.penaltyList.length > 0 ? (
              penaltyInfo.penaltyList.map(
                (penalty: PartyPenaltyAdmin, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['partyPenaltyAdmin'].columns.map(
                      (columnName) => {
                        return (
                          <TableCell
                            key={columnName}
                            className={styles.tableBodyItem}
                          >
                            {columnName === 'edit' ? (
                              <button
                                onClick={() => handleEditpenalty(penalty)}
                                className={`${styles.button_1} ${styles.edit}`}
                              >
                                수정
                              </button>
                            ) : columnName === 'startTime' ? (
                              <span>
                                {dateToStringShort(new Date(penalty.startTime))}
                              </span>
                            ) : (
                              penalty[
                                columnName as keyof PartyPenaltyAdmin
                              ]?.toString()
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'패널티 기록이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={penaltyInfo.currentPage}
          totalPages={penaltyInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
