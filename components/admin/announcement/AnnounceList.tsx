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
  IAnnouncement,
  IAnnouncementTable,
} from 'types/admin/adminAnnouncementTypes';
import { QUILL_FORMATS } from 'types/quillTypes';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
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
  content: '내용',
  createdAt: '생성 시간',
  creatorIntraId: '생성한 사람',
  deletedAt: '삭제 시간',
  deleterIntraId: '삭제한 사람',
  modifiedAt: '수정 시간',
};

export default function AnnounceList() {
  const [announcementInfo, setAnnouncementInfo] = useState<IAnnouncementTable>({
    announcementList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getAnnouncements = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/announcement?page=${currentPage}&size=3`
      );
      setAnnouncementInfo({
        announcementList: res.data.announcementList.map(
          (announcement: IAnnouncement) => {
            return {
              ...announcement,
              createdAt: dateToStringShort(new Date(announcement.createdAt)),
              deletedAt: announcement.deletedAt
                ? dateToStringShort(new Date(announcement.deletedAt))
                : null,
              modifiedAt: dateToStringShort(new Date(announcement.modifiedAt)),
            };
          }
        ),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>과거 공지사항</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'announcement'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {announcementInfo.announcementList.length > 0 ? (
              announcementInfo.announcementList.map(
                (announcement: IAnnouncement, index: number) => (
                  <TableRow key={index}>
                    {tableFormat['announcement'].columns.map(
                      (columnName: string, index: number) => {
                        return columnName == 'content' ? (
                          <TableCell
                            className={styles.tableBodyItemQuill}
                            key={index}
                          >
                            <Quill
                              className={styles.quillViewer}
                              readOnly={true}
                              formats={QUILL_FORMATS}
                              value={announcement[
                                columnName as keyof IAnnouncement
                              ]?.toString()}
                              theme='bubble'
                            />
                          </TableCell>
                        ) : (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {announcement[
                              columnName as keyof IAnnouncement
                            ]?.toString()}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                )
              )
            ) : (
              <AdminEmptyItem content={'기존 공지사항이 없습니다'} />
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
    </div>
  );
}
