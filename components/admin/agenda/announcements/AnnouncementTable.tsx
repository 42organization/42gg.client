import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { instance } from 'utils/axios';
import { dateToString } from 'utils/handleTime';
import { agendaTableFormat } from 'constants/admin/agendaTable';
import { NoContent } from 'components/admin/agenda/utils';
import { AdminAgendaTableHead } from 'components/admin/takgu/common/AdminTable';
import AnnouncementForm from 'components/agenda/Form/AnnouncementForm';
import { useModal } from 'components/agenda/modal/useModal';
import PageNation from 'components/Pagination';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/admin/agenda/agendaList/AgendaTable.module.scss';

const itemsPerPage = 10;

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  title: '제목',
  content: '내용',
  isShow: '공개 여부',
  createdAt: '생성일',
  etc: '기타',
};

export interface IAnnouncement {
  id: number;
  title: string;
  content: string;
  isShow: boolean;
  createdAt: string;
}

export interface IAnnouncementTable {
  announcementList: IAnnouncement[];
  totalPage: number;
  currentPage: number;
}

export default function AnnouncementTable() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const { openModal, closeModal } = useModal();

  const [announcementInfo, setAnnouncementInfo] = useState<IAnnouncementTable>({
    announcementList: [],
    totalPage: 1,
    currentPage: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAgendaKey, setSelectedAgendaKey] = useState<string>('');
  const agendaList = useFetchGet({ url: 'admin/list' }).data || [];

  useEffect(() => {
    if (agendaKey) {
      setSelectedAgendaKey(agendaKey as string);
    }
  }, [agendaKey]);

  useEffect(() => {
    if (selectedAgendaKey) {
      fetchAnnouncementList();
    }
  }, [selectedAgendaKey, currentPage]);

  const fetchAnnouncementList = useCallback(async () => {
    if (!selectedAgendaKey) return;

    try {
      const response = await instance.get(`/agenda/admin/announcement`, {
        params: {
          agenda_key: selectedAgendaKey,
          page: currentPage,
          size: itemsPerPage,
        },
      });

      setAnnouncementInfo({
        announcementList: response.data.content.map(
          (announce: IAnnouncement) => ({
            ...announce,
            createdAt: dateToString(new Date(announce.createdAt)),
          })
        ),
        totalPage: Math.ceil(response.data.totalSize / itemsPerPage),
        currentPage,
      });
    } catch (error) {
      console.error('Error fetching announcement list:', error);
    }
  }, [currentPage, selectedAgendaKey]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value as string;
    setSelectedAgendaKey(newValue);
    setCurrentPage(1);
    router.push(`?agendaKey=${newValue}`);
  };

  const handleButtonAction = (announce: IAnnouncement) => {
    openModal({
      type: 'modify',
      title: '공지사항 수정',
      description: '변경 후 수정 버튼을 눌러주세요.',
      FormComponent: AnnouncementForm,
      data: announce,
      stringKey: agendaKey as string,
      isAdmin: true,
      onProceed: () => {
        closeModal();
        fetchAnnouncementList();
      },
    });
  };

  const renderIsShow = (isShow: boolean) => (isShow ? '공개' : '비공개');

  return (
    <div className={styles.agendaListWrap}>
      <div className={styles.header}>
        <span className={styles.title}>공지사항 관리</span>
        <Select
          value={selectedAgendaKey}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value='' disabled>
            Choose an agenda...
          </MenuItem>
          {Array.isArray(agendaList) &&
            agendaList.map((agenda) => (
              <MenuItem key={agenda.agendaKey} value={agenda.agendaKey}>
                {agenda.agendaTitle}
              </MenuItem>
            ))}
        </Select>
      </div>
      {selectedAgendaKey ? (
        <>
          <TableContainer className={styles.tableContainer} component={Paper}>
            <Table className={styles.table} aria-label='agenda table'>
              <AdminAgendaTableHead
                tableName={'announcement'}
                table={tableTitle}
              />
              <TableBody className={styles.tableBody}>
                {announcementInfo.announcementList &&
                announcementInfo.announcementList.length > 0 ? (
                  announcementInfo.announcementList.map(
                    (announce: IAnnouncement, index) => (
                      <TableRow
                        key={`${announce.id}-${index}`}
                        className={styles.tableRow}
                      >
                        {agendaTableFormat['announcement'].columns.map(
                          (columnName: string, index: number) => {
                            return (
                              <TableCell
                                className={styles.tableBodyItem}
                                key={index}
                              >
                                {columnName === 'isShow' ? (
                                  renderIsShow(announce[columnName])
                                ) : columnName !== 'etc' ? (
                                  announce[columnName as keyof IAnnouncement] // 다른 열의 기본 값 표시
                                ) : (
                                  <button
                                    className={`${styles.button} ${styles.coin}`}
                                    onClick={() => handleButtonAction(announce)}
                                  >
                                    수정
                                  </button>
                                )}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    )
                  )
                ) : (
                  <NoContent col={6} content={'공지사항이 없습니다.'} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.pageNationContainer}>
            <PageNation
              curPage={announcementInfo.currentPage}
              totalPages={announcementInfo.totalPage}
              pageChangeHandler={(pageNumber: number) => {
                setCurrentPage(pageNumber);
              }}
            />
          </div>
        </>
      ) : (
        <div className={styles.noAgendaMessage}>아젠다를 선택해주세요.</div>
      )}
    </div>
  );
}
