import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  ITournament,
  ITournamentTable,
} from 'types/admin/adminTournamentTypes';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/announcement/AnnounceList.module.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const tableTitle: { [key: string]: string } = {
  tournamentName: '토너먼트 이름',
  startTime: '시작 시간',
  endTime: '종료 시간',
  tournamentType: '토너먼트 타입',
  edit: '수정하기',
};

const smapleTournamentList: ITournament[] = Array.from({ length: 10 }, () => ({
  title: '샘플토너먼트제목',
  content: '샘플내용',
  startTime: new Date(),
  endTime: new Date(),
  tournamentType: 'CUSTOM',
  count: 7,
}));

export default function TournamentList() {
  const [tournamentInfo, setTournamentInfo] = useState<ITournamentTable>({
    tournamentList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getTournaments = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/announcement?page=${currentPage}&size=3`
      // );
      setTournamentInfo({
        tournamentList: smapleTournamentList, //res.data.tournamentList,
        totalPage: 10, //res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    getTournaments();
  }, [getTournaments]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>토너먼트 리스트</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'tournament'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {tournamentInfo.tournamentList.length > 0 ? (
              tournamentInfo.tournamentList.map(
                (tournament: ITournament, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['tournament'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {columnName === 'startTime' ||
                            columnName === 'endTime'
                              ? tournament[
                                  columnName as keyof ITournament
                                ]?.toLocaleString()
                              : tournament[
                                  columnName as keyof ITournament
                                ]?.toString()}
                          </TableCell>
                        );
                      }
                    )}
                    <TableCell>
                      <div>
                        <button
                          className={styles.editBtn}
                          // onClick={() => deleteHandler(seasonL.seasonId)}
                        >
                          삭제
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'기존 토너먼트가 없습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={tournamentInfo.currentPage}
          totalPages={tournamentInfo.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </div>
  );
}
