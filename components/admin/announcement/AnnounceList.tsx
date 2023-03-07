import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import instance from 'utils/axios';
import PageNation from 'components/Pagination';
import { tableFormat } from 'constants/admin/table';
import { QUILL_FORMATS } from 'types/quillTypes';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import styles from 'styles/admin/announcement/AnnounceList.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IAnnouncement {
  content: string;
  creatorIntraId: string;
  deleterIntraId: string;
  deletedTime: Date;
  createdTime: Date;
  isDel: boolean;
}

interface IAnnouncementTable {
  announcementList: IAnnouncement[];
  totalPage: number;
  currentPage: number;
}

export default function AnnounceList() {
  const [announcementInfo, setAnnouncementInfo] = useState<IAnnouncementTable>({
    announcementList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getAnnouncements = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/announcement?page=${currentPage}&size=5`
      );
      console.log(res.data);
      setAnnouncementInfo({ ...res.data });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  if (announcementInfo.announcementList.length === 0) {
    return <div>비어있습니다!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>과거 공지사항</span>
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableFormat['announcement'].columns.map((columnName) => (
                <TableCell className={styles.tableHeaderItem} key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {announcementInfo.announcementList.map(
              (announcement: IAnnouncement, index: number) => (
                <TableRow key={index}>
                  {tableFormat['announcement'].columns.map(
                    (columnName: string, index: number) => {
                      return columnName == 'content' ? (
                        <TableCell>
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
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'createdTime' ||
                          columnName === 'deletedTime'
                            ? announcement[columnName as keyof IAnnouncement]
                                ?.toString()
                                .replace('T', ' ')
                            : announcement[
                                columnName as keyof IAnnouncement
                              ]?.toString()}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              )
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
