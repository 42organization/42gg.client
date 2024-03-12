import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyPenaltyAdmin } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/party/PartyMain.module.scss';

const tableTitle: { [key: string]: string } = {
  id: '번호',
  user: '유저',
  penaltyType: '패널티 구분',
  message: '내용',
  startTime: '시작 시간',
  penaltyTime: '패널티 시간',
};

export default function PartyPenalty() {
  const [penalty, setPenalty] = useState<PartyPenaltyAdmin[]>([]);

  useEffect(() => {
    fetchPartyPenalty();
  }, []);

  const fetchPartyPenalty = () => {
    mockInstance
      .get('/party/admin/penalty')
      .then(({ data }: { data: PartyPenaltyAdmin[] }) => {
        setPenalty(data);
      });
  };

  // add 로직 구현해야함 modal 형식으로 할것인지 보여지게 할것 인지 결정해야함
  // 따라서 변경 부분도 아직 구현 안함
  const addPenalty = () => {
    console.log('추가 버튼 눌러짐');
  };

  // const changePenalty = () => {
  //   console.log('변경 버튼 눌러짐');
  // };

  const deletePenalty = (penaltyId: number) => {
    mockInstance
      .delete(`/party/admin/penalty/${penaltyId}`)
      .then(() => {
        fetchPartyPenalty();
      })
      .catch((error) => {
        console.error('패널티 삭제 중 오류가 발생했습니다:', error);
      });
  };

  return (
    <div className={styles.userManagementWrap}>
      <div className={styles.header}>
        <span className={styles.title}>패널티 리스트</span>
      </div>
      <button onClick={addPenalty}>추가</button>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='UserManagementTable'>
          <AdminTableHead tableName={'partyPenaltyAdmin'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {penalty.map((p) => (
              <TableRow key={p.id} className={styles.tableRow}>
                {tableFormat['partyPenaltyAdmin'].columns.map((columnName) => {
                  return (
                    <TableCell
                      className={styles.tableBodyItem}
                      key={columnName}
                    >
                      {columnName === 'delete' ? (
                        <button onClick={() => deletePenalty(p.id)}>
                          삭제
                        </button>
                      ) : (
                        p[columnName as keyof PartyPenaltyAdmin]?.toString()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
