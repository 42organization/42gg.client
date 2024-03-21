import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
 IconButton } from '@mui/material';
import { TableRowProps } from '@mui/material/TableRow';
import {
  IrecruitUserTable,
  Iquestion,
} from 'types/admin/adminRecruitmentsTypes';
// import { instanceInManage } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import {
  AdminEmptyItem,
  AdminTableHead,
  // AdminContent,
  DetailContentHover,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
import RecruitSearchBar from './RecruitSearchBar';
//TODO: 테이블 헤더, 테이블 바디, 페이지네이션 컴포넌트 분리
// 기본적인 부분
// 3. 페이지네이션 추가
// 4. 필터 추가

/* 
추가할 기능
가로세로 길이 조절
가로세로 위치 변경
호버 기능?
*/
export interface IrecruitTable {
  applications: IrecruitUserTable[];
  totalPage: number;
  currentPage: number;
}

interface ExpandableTableRowProps extends TableRowProps {
  children: React.ReactNode;
  expandComponent: React.ReactNode;
}

const tableTitle: { [key: string]: string } = {
  id: '',
  intraId: 'intraId',
  status: '상태',
  question: '질문',
};

const ExpandableTableRow: React.FC<ExpandableTableRowProps> = ({
  children,
  expandComponent,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding='checkbox'>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding='checkbox' colSpan={children?.length + 2}>
            {expandComponent}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

function DetailRecruitUserList({ recruitId }: { recruitId: number }) {
  const [recruitUserData, setRecruitUserData] = useState<IrecruitTable>({
    applications: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);
  const [questionId, setQuestionId] = useState<string>('');
  const [checklistIds, setChecklistIds] = useState<Array<string>>([]);
  const [searchString, setSearchString] = useState<string>('');

  const initSearch = useCallback((searchString?: string) => {
    setSearchString(searchString || '');
    setCurrentPage(1);
  }, []);

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestionId(event.target.value);
  };

  const handleChecklistChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (event.target.checked) {
      setChecklistIds([...checklistIds, value]);
    } else {
      setChecklistIds(checklistIds.filter((id) => id !== value));
    }
  };

  const getRecruitUserHandler = useCallback(async () => {
    try {
      // const res = await instanceInManage.get(
      //   `/recruitments/${recruitId}/applications`, {
      //     params: {
      //       page: currentPage,
      //       size: 20,
      //       question: questionId,
      //       checks: checklistIds.join(','),
      //       search: searchString,
      //     }
      //   }
      // );
      console.log('searchString', searchString);
      const id = recruitId;
      const res = await mockInstance.get(`/admin/recruitments/${id}`);
      setRecruitUserData({
        applications: res.data.applications,
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
  }, [currentPage, recruitId, questionId, checklistIds, searchString]);

  useEffect(() => {
    getRecruitUserHandler();
  }, [
    getRecruitUserHandler,
    currentPage,
    questionId,
    checklistIds,
    searchString,
  ]);

  if (!recruitUserData.applications) {
    return (
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'recruitUserList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            <AdminEmptyItem content={'공고 지원자 내역이 비어있습니다'} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchString(event.target.value);
  // }

  const FilterQptionsUI = () => (
    <div>
      <div className={styles.searchWrap}>
        <RecruitSearchBar initSearch={initSearch} />
      </div>
      <select value={questionId} onChange={handleQuestionChange}>
        <option value=''>질문 선택</option>
        {recruitUserData.applications.map((application) =>
          application.form.map((form) => (
            <option key={form.id} value={form.id}>
              {form.question}
            </option>
          ))
        )}
      </select>
      <div>
        <label>
          <input
            type='checkbox'
            value='check1'
            checked={checklistIds.includes('check1')}
            onAbort={handleChecklistChange}
          />
          체크박스1
        </label>
        <label>
          <input
            type='checkbox'
            value='check2'
            checked={checklistIds.includes('check2')}
            onAbort={handleChecklistChange}
          />
          체크박스2
        </label>
      </div>
    </div>
  );

  const questions = recruitUserData.applications.reduce(
    (acc: string[], application: { form: { question: string }[] }) => {
      application.form.forEach(({ question }) => {
        if (acc.indexOf(question) === -1) {
          acc.push(question);
        }
      });
      return acc;
    },
    []
  );

  const renderTableCells = (recruit: IrecruitUserTable) => {
    const answers = questions.map((question) => {
      const formItem = recruit.form.find((form) => form.question === question);
      if (!formItem) return 'N/A';

      switch (formItem.inputType) {
        case 'TEXT':
          return formItem.answer;
        case 'SINGLE_CHECK':
          return formItem.checkedList?.map((item) => item.content).join(', ');
        case 'MULTI_CHECK':
          return formItem.checkedList
            ?.flatMap((item) =>
              item.content.map((c: { content: string }) => c.content)
            )
            .join(', ');
      }
    });

    return (
      <ExpandableTableRow
        key={recruit.applicationId}
        expandComponent={
          <div style={{ padding: '16px' }}>
            <div>
              <strong>intraId:</strong> {recruit.intraId}
            </div>
            <div>
              <strong>status:</strong> {recruit.status}
            </div>
            {recruit.form.map((form, index) => (
              <div key={index}>
                <strong>{form.question}</strong>:{' '}
                {form.answer ? form.answer : 'N/A'}
              </div>
            ))}
          </div>
        }
      >
        <TableCell className={styles.tableBodyItem}>
          {recruit.intraId}
        </TableCell>
        <TableCell className={styles.tableBodyItem}>{recruit.status}</TableCell>
        {answers.map((answer, index) => (
          <TableCell className={styles.tableBodyItem} key={index}>
            <div className={styles.tableBodyItem}>
              <DetailContentHover content={answer} maxLen={16} />
            </div>
          </TableCell>
        ))}
      </ExpandableTableRow>
    );
  };

  return (
    <>
      <FilterQptionsUI />
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.tableHeaderItem}></TableCell>
              <TableCell className={styles.tableHeaderItem}>intraId</TableCell>
              <TableCell className={styles.tableHeaderItem}>status</TableCell>
              {questions.map((question, index) => (
                <TableCell className={styles.tableHeaderItem} key={index}>
                  {question}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {recruitUserData.applications.map(renderTableCells)}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={recruitUserData.currentPage}
          totalPages={recruitUserData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default DetailRecruitUserList;
