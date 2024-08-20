import { useRouter } from 'next/router';
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
import { instance } from 'utils/axios';
import { dateToString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AgendaStatus } from 'constants/agenda/agenda';
import { NoContent } from 'components/admin/agenda/utils';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import ModifyAgendaForm from 'components/agenda/Form/ModifyAgendaForm';
import { useModal } from 'components/agenda/modal/useModal';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const tableTitle: { [key: string]: string } = {
  agendaId: 'Id',
  // agendaPosterUrl:'포스터',
  agendaTitle: '제목',
  agendaDeadLine: '모집 마감일',
  agendaStartTime: '시작 시간',
  agendaEndTime: '종료 시간',
  // agendaCurrentTeam: '참가 팀',
  // agendaMaxTeam: '최대 팀',
  // agendaMinPeople: '최소 인원',
  // agendaMaxPeople: '최대 인원',
  agendaLocation: '장소',
  // agendaKey: '아젠다 ID',
  // isRanking: '랭킹 여부',
  isOfficial: '공식 여부',
  agendaStatus: '상태',

  // ---------------------
  etc: '기타',
};

export interface IAgenda {
  agendaId: number;
  agendaPosterUrl: string;
  agendaTitle: string;
  agendaDeadLine: string;
  agendaStartTime: string;
  agendaEndTime: string;
  agendaCurrentTeam: number;
  agendaMaxTeam: number;
  agendaMinPeople: number;
  agendaMaxPeople: number;
  agendaLocation: string;
  agendaKey: string;
  isRanking: boolean;
  isOfficial: boolean;
  agendaStatus: string;
}

export interface IAgendaTable {
  agendaList: IAgenda[];
  totalPage: number;
  currentPage: number;
}

interface AgendaTableProps {
  status?: AgendaStatus;
  isOfficial?: boolean;
}

export default function AgendaTable({ status, isOfficial }: AgendaTableProps) {
  const router = useRouter();
  const [agendaInfo, setAgendaInfo] = useState<IAgendaTable>({
    agendaList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSnackBar = useSetRecoilState(toastState);
  const { openModal } = useModal();
  // const modal = useRecoilValue(modalState);
  const buttonList: string[] = [styles.detail, styles.coin, styles.penalty];

  const handleButtonAction = (buttonName: string, agenda: any) => {
    const agendaKey = agenda.agendaKey;
    switch (buttonName) {
      case '자세히':
        openModal({
          type: 'modify',
          title: '대회 상세정보',
          description: '수정 후 확인 버튼을 눌러주세요.',
          FormComponent: ModifyAgendaForm,
          data: agenda,
          submitId: 'modifyAgenda',
          stringKey: agendaKey,
        });
        break;
      case '팀 목록':
        router.push(`/admin/agenda/teamList?agendaKey=${agendaKey}`);
        break;
      case '공지사항':
        router.push(`/admin/agenda/announcements?agendaKey=${agendaKey}`);
        break;
    }
  };

  const getAgendaList = useCallback(async () => {
    try {
      const getData = await instance.get(
        `/agenda/admin/request/list?page=${currentPage}&size=10`
      );
      // setSnackBar({
      //   toastName: 'GET request',
      //   message: 'agenda List를 가져오는데 실패했습니다.',
      //   severity: 'error',
      //   clicked: true,
      // });

      const filteredAgendaList = getData.data.filter((agenda: IAgenda) => {
        const matchesStatus = status ? agenda.agendaStatus === status : true;
        const matchesOfficial =
          isOfficial !== undefined ? agenda.isOfficial === isOfficial : true;
        return matchesStatus && matchesOfficial;
      });

      setAgendaInfo({
        agendaList: filteredAgendaList.map((agenda: IAgenda) => {
          return {
            ...agenda,
            agendaDeadLine: dateToString(new Date(agenda.agendaDeadLine)),
            agendaStartTime: dateToString(new Date(agenda.agendaStartTime)),
            agendaEndTime: dateToString(new Date(agenda.agendaEndTime)),
          };
        }),
        totalPage: 10,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS00');
    }
  }, [currentPage, status, isOfficial]);

  useEffect(() => {
    getAgendaList();
  }, [getAgendaList]);

  const renderStatus = (status: string) => {
    switch (status) {
      case AgendaStatus.CANCEL:
        return '취소';
      case AgendaStatus.OPEN:
        return '진행 중';
      case AgendaStatus.CONFIRM:
        return '확정';
      case AgendaStatus.FINISH:
        return '진행완료';
      default:
        return '알 수 없음';
    }
  };

  const renderOfficial = (isOfficial: boolean) => {
    return isOfficial ? '공식' : '비공식';
  };

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>아젠다 관리</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='agenda table'>
          <AdminAgendaTableHead tableName={'agenda'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {agendaInfo.agendaList.length > 0 ? (
              agendaInfo.agendaList.map((agenda: IAgenda) => (
                <TableRow key={agenda.agendaId} className={styles.tableRow}>
                  {agendaTableFormat['agenda'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'agendaStatus'
                            ? renderStatus(agenda.agendaStatus) // 상태 표시
                            : columnName === 'isOfficial'
                            ? renderOfficial(agenda.isOfficial) // 공식 여부 표시
                            : columnName !== 'etc'
                            ? agenda[columnName as keyof IAgenda] // 다른 열의 기본 값 표시
                            : agendaTableFormat['agenda'].etc?.value.map(
                                (buttonName: string, index: number) => (
                                  <button
                                    key={buttonName}
                                    className={`${styles.button} ${buttonList[index]}`}
                                    onClick={() =>
                                      handleButtonAction(buttonName, agenda)
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
              <NoContent col={9} content={'아젠다가 없습니다.'} />
            )}
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
