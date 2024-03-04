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
import { Irecruit, IrecruitTable } from 'types/admin/adminRecruitmentsTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import {
  AdminEmptyItem,
  AdminTableHead,
  AdminContent,
} from 'components/admin/common/AdminTable';
import MenuTab from 'components/admin/recruitmentsuser/menuTab';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/Recruitments.module.scss';

const initialRecruitData: IrecruitTable = {
  recruitList: [
    {
      id: 1,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      title: '테스트 모집',
      status: '모집전',
      generation: '1기',
    },
    {
      id: 2,
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      title: '테스트 모집qqqqqqasdfasdasdvasvsadvasdvsadvasdvsavasvas',
      status: '모집중',
      generation: '2기',
    },
    {
      id: 3,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      title: '테스트 모집',
      status: '완료',
      generation: '3기',
    },
  ],
  totalPage: 3,
  currentPage: 1,
};

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  usedAt: '적용 시간',
  title: '제목',
  status: '상태',
  detailRecruitment: '공고 상세보기',
  detaillUser: '지원자 보기',
};

function RecruitmentsHistoryList() {
  // const [recruitData, setRecruitData] = useState<IrecruitTable>({
  //   recruitList: [],
  //   totalPage: 0,
  //   currentPage: 0,
  // });
  const [view, setView] = useState<string>('recruitList');
  const [selcetedRecruit, setSelectedRecruit] = useState<number>(1);
  const [recruitData, setRecruitData] =
    useState<IrecruitTable>(initialRecruitData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);

  const getRecruitHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/admin/recruitments?page=${currentPage}&size=20`
      );
      setRecruitData({
        recruitList: res.data.recruitment.map((recruit: Irecruit) => {
          return {
            ...recruit,
            startDate: dateToStringShort(new Date(recruit.startDate)),
            endDate: dateToStringShort(new Date(recruit.endDate)),
          };
        }),
        totalPage: res.data.totalPages,
        currentPage: res.data.number + 1,
      });
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

  const recruitmentApplicant = (recruitId: number) => {
    setSelectedRecruit(recruitId);
    setView('detail');
  };

  useEffect(() => {
    getRecruitHandler();
  }, [currentPage]);

  return (
    <>
      {view === 'detail' ? (
        <MenuTab recruitId={selcetedRecruit} />
      ) : (
        <>
          <TableContainer className={styles.tableContainer} component={Paper}>
            <Table className={styles.table} aria-label='customized table'>
              <AdminTableHead tableName={'recruitList'} table={tableTitle} />
              <TableBody className={styles.tableBody}>
                {recruitData.recruitList.length > 0 ? (
                  recruitData.recruitList.map((recruit: Irecruit) => (
                    <TableRow className={styles.tableRow} key={recruit.id}>
                      {tableFormat['recruitList'].columns.map(
                        (columnName: string, index: number) => {
                          return (
                            <TableCell
                              className={styles.tableBodyItem}
                              key={index}
                            >
                              {columnName === 'detailRecruitment' ? (
                                <button
                                  className={styles.deleteBtn}
                                  // onClick={() => detailRecruit(recruit)}
                                >
                                  {recruit.status === '완료'
                                    ? '공고 상세보기'
                                    : '수정'}
                                </button>
                              ) : columnName === 'detaillUser' ? (
                                <button
                                  className={styles.deleteBtn}
                                  onClick={() =>
                                    recruitmentApplicant(recruit.id)
                                  }
                                >
                                  지원자 보기
                                </button>
                              ) : columnName === 'usedAt' ? (
                                <div>
                                  {`${recruit.startDate} ~ ${recruit.endDate}`}
                                </div>
                              ) : (
                                <AdminContent
                                  content={recruit[
                                    columnName as keyof Irecruit
                                  ]?.toString()}
                                  maxLen={16}
                                  detailTitle={recruit.id.toString()}
                                  detailContent={recruit.title}
                                />
                              )}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  ))
                ) : (
                  <AdminEmptyItem content={'공고 지원 내역이 비어있습니다'} />
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
      )}
    </>
  );
}

export default RecruitmentsHistoryList;
