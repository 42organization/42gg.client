import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  Irecruit,
  IrecruitTable,
  RecruitmentDetailProps,
  RecruitmentsPages,
} from 'types/admin/adminRecruitmentsTypes';
import { instance } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
  AdminContent,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/Recruitments.module.scss';
import MenuTab from './recruitmentsuser/MenuTab';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  usedAt: '적용 시간',
  title: '제목',
  isFinish: '상태',
  detailRecruitment: '공고 상세보기',
  detaillUser: '지원자 보기',
};

function RecruitmentsHistoryList({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<RecruitmentsPages>>;
}) {
  const [recruitData, setRecruitData] = useState<IrecruitTable>({
    recruitmentDtoList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [view, setView] = useState<string>('recruitment');
  const [selectedRecruit, setSelectedRecruit] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitHandler = useCallback(async () => {
    try {
      const res = await instance.get(
        `/admin/recruitments?page=${currentPage}&size=20`
      );
      // FIXME : 페이지네이션 x 임시로 1페이지로 고정
      setRecruitData({
        recruitmentDtoList: res.data.recruitments,
        totalPage: 1,
        currentPage: 1,
      });
      // setRecruitData({
      //   recruitment: res.data.recruitment,
      //   totalPage: res.data.totalPages,
      //   currentPage: res.data.number + 1,
      // });
    } catch (e: any) {
      setSnackBar({
        toastName: 'get recruitment',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  // const detailRecruit = (recruit: Irecruit) => {

  // };

  const recruitmentApplicant = (recruitId: number | undefined) => {
    if (!recruitId) return;
    setSelectedRecruit(recruitId);
    setView('detail');
  };

  useEffect(() => {
    getRecruitHandler();
  }, [currentPage]);

  if (view === 'detail') {
    return <MenuTab setPage={setPage} recruitId={selectedRecruit} />;
  }

  const renderTableCell = (recruit: Irecruit, columnName: string) => {
    if (columnName === 'detailRecruitment') {
      return (
        <button
          className={styles.deleteBtn}
          onClick={() => {
            const props = {
              setPage: setPage,
              recruit: recruit,
            } as RecruitmentDetailProps;
            setPage({ pageType: 'DETAIL', props: props });
          }}
        >
          상세보기
        </button>
      );
    }

    if (columnName === 'detaillUser') {
      return (
        <button
          className={styles.deleteBtn}
          onClick={() => recruitmentApplicant(recruit.id)}
        >
          지원자 보기
        </button>
      );
    }

    if (columnName === 'usedAt') {
      return (
        <div>
          {`${dateToStringShort(
            new Date(recruit.startDate)
          )} ~ ${dateToStringShort(new Date(recruit.endDate))}`}
        </div>
      );
    }

    return (
      <AdminContent
        content={recruit[columnName as keyof Irecruit]?.toString() as string}
        maxLen={16}
        detailTitle={(recruit.id as number).toString()}
        detailContent={recruit.title}
      />
    );
  };

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'recruitment'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {recruitData.recruitmentDtoList.length > 0 ? (
              recruitData.recruitmentDtoList.map((recruit: Irecruit) => (
                <TableRow className={styles.tableRow} key={recruit.id}>
                  {tableFormat['recruitment'].columns.map(
                    (columnName: string, index: number) => (
                      <TableCell className={styles.tableBodyItem} key={index}>
                        {renderTableCell(recruit, columnName)}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <AdminEmptyItem content={'공고 내역이 비어있습니다'} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={recruitData.currentPage}
          totalPages={recruitData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default RecruitmentsHistoryList;
