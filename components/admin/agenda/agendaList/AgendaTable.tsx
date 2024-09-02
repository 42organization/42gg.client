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
import { instanceInAgenda } from 'utils/axios';
import { dateToString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { AgendaStatus } from 'constants/agenda/agenda';
import { NoContent } from 'components/admin/agenda/utils';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import ModifyAgendaForm from 'components/agenda/Form/ModifyAgendaForm';
import { useModal } from 'components/agenda/modal/useModal';
import PageNation from 'components/Pagination';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10;

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
  const { sendRequest } = useFetchRequest();

  const [agendaInfo, setAgendaInfo] = useState<IAgendaTable>({
    agendaList: [],
    totalPage: 1,
    currentPage: 1,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openModal, closeModal } = useModal();

  const buttonList: string[] = [
    styles.delete,
    styles.default,
    styles.detail,
    styles.coin,
    styles.penalty,
  ];

  const deleteAgenda = async (agenda: any) => {
    const agendaKey = agenda.agendaKey;

    const formatDate = (date: string) => {
      return date.replace(' ', 'T') + ':00';
    };

    const updatedAgenda = {
      ...agenda,
      agendaStartTime: formatDate(agenda.agendaStartTime),
      agendaEndTime: formatDate(agenda.agendaEndTime),
      agendaDeadLine: formatDate(agenda.agendaDeadLine),
      agendaStatus: 'CANCEL',
      agendaPoster: null,
    };

    const formData = new FormData();
    Object.keys(updatedAgenda).forEach((key) => {
      formData.append(key, updatedAgenda[key]);
    });

    await sendRequest(
      'POST',
      `admin/request`,
      formData,
      { agenda_key: agendaKey },
      (data) => {
        alert('취소 요청이 성공적으로 전송되었습니다.');
        getAgendaList();
      },
      (error) => {
        alert('취소 요청에 실패했습니다: ' + error);
      }
    );
  };

  const handleButtonAction = (buttonName: string, agenda: any) => {
    const agendaKey = agenda.agendaKey;
    switch (buttonName) {
      case '자세히':
        openModal({
          type: 'modify',
          title: '대회 상세정보',
          description: '변경 후 수정 버튼을 눌러주세요.',
          FormComponent: ModifyAgendaForm,
          data: agenda,
          isAdmin: true,
          stringKey: agendaKey,
          onProceed: () => {
            closeModal();
            getAgendaList();
          },
        });
        break;
      case '취소':
        deleteAgenda(agenda);
        break;
      case '팀 목록':
        router.push(`/admin/agenda/teamList?agendaKey=${agendaKey}`);
        break;
      case '공지사항':
        router.push(`/admin/agenda/announcements?agendaKey=${agendaKey}`);
        break;
      case '포스터':
        if (!agenda.agendaPosterUrl) {
          alert('포스터가 없습니다.');
          return;
        }
        openModal({
          type: 'notice',
          title: '포스터',
          description: "포스터 수정은 '자세히' 버튼을 눌러주세요.",
          image: agenda.agendaPosterUrl,
        });
        break;
    }
  };

  const getAgendaList = useCallback(async () => {
    try {
      const getData = await instanceInAgenda.get(
        `/admin/request/list?page=${currentPage}&size=${itemsPerPage}`
      );
      const filteredAgendaList = getData.data.content.filter(
        (agenda: IAgenda) => {
          const matchesStatus = status ? agenda.agendaStatus === status : true;
          const matchesOfficial =
            isOfficial !== undefined ? agenda.isOfficial === isOfficial : true;
          return matchesStatus && matchesOfficial;
        }
      );

      setAgendaInfo({
        agendaList: filteredAgendaList.map((agenda: IAgenda) => {
          return {
            ...agenda,
            agendaDeadLine: dateToString(new Date(agenda.agendaDeadLine)),
            agendaStartTime: dateToString(new Date(agenda.agendaStartTime)),
            agendaEndTime: dateToString(new Date(agenda.agendaEndTime)),
          };
        }),
        totalPage: Math.ceil(getData.data.totalSize / itemsPerPage),
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
