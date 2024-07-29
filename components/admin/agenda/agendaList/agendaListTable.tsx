import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { instance } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/agenda/agendaList/AgendaListTable.module.scss';
const MAX_CONTENT_LENGTH = 15;

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  title: '제목',
  contents: '설명',
  deadLine: '모집완료기간',
  startTime: '대회시작시간',
  endTime: '대회종료시간',
  minTeam: '최소 팀 인원',
  maxTeam: '최대 팀 인원',
  currentTeam: '현재 팀 인원',
  minPeople: '최소 팀내 인원',
  maxPeople: '최대 팀내 인원',
  poster: '포스터',
  host: '주최자',
  location: '장소',
  status: '상태',
  createdAt: '생성일',
  isRanking: '시상 여부',
  isOfficial: '공식 대회 여부',
};

export interface IAgenda {
  id: number;
  title: string;
  contents: string;
  deadLine: Date;
  eventTime: Date;
  minTeam: number;
  maxTeam: number;
  currentTeam: number;
  minPeople: number;
  maxPeople: number;
  poster: string;
  host: string;
  location: string;
  status: string;
  createdAt: Date;
  isRanking: boolean;
  isOfficial: boolean;
}

export interface IAgendaTable {
  agendaList: IAgenda[];
  totalPage: number;
  currentPage: number;
}

export default function AgendaListTable() {
  const [agendaInfo, setAgendaInfo] = useState<IAgendaTable>({
    agendaList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const modal = useRecoilValue(modalState);

  const getAgendaList = useCallback(async () => {
    try {
      const res = await instance.get(
        `/agenda/admin/request/list?page=${currentPage}&size=10`
      );

      setAgendaInfo({
        agendaList: res.data.agendaList.map((agenda: IAgenda) => {
          return {
            ...agenda,
            deadLine: dateToStringShort(new Date(agenda.deadLine)),
            eventTime: dateToStringShort(new Date(agenda.eventTime)),
            createdAt: dateToStringShort(new Date(agenda.createdAt)),
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS00');
    }
  }, [currentPage]);
  useEffect(() => {
    getAgendaList();
  }, []);
  // if (agendaInfo.agendaList.length === 0) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>아젠다 관리</span>
        {/* <div className={styles.searchWrap}>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div> */}
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='agenda table'>
          <AdminAgendaTableHead tableName={'agenda'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {agendaInfo.agendaList.map((agenda: IAgenda) => (
              <TableRow key={agenda.id} className={styles.tableRow}>
                {agendaTableFormat['agenda'].columns.map(
                  (columnName: string, index: number) => {
                    return (
                      <TableCell className={styles.tableBodyItem} key={index}>
                        {/* <AdminContent
                          content={agenda[
                            columnName as keyof IAgenda
                          ]?.toString()}
                          maxLen={MAX_CONTENT_LENGTH}
                          detailTitle={agenda.title}
                          detailContent={agenda.contents}
                        /> */}
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={agendaInfo.currentPage}
          totalPages={agendaInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
