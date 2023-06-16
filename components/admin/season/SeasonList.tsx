import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { tableFormat } from 'constants/admin/table';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { ISeason, ISeasonList } from 'types/seasonTypes';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/season/SeasonList.module.scss';

export default function SeasonList() {
  const setModal = useSetRecoilState(modalState);
  const [useSeasonList, setUseSeasonList] = useState<ISeasonList>({
    seasonList: [],
  });

  const setSnackBar = useSetRecoilState(toastState);

  const getSeasonList = async () => {
    try {
      const res = await instanceInManage.get(`/seasons`);
      setUseSeasonList({ ...res.data });
    } catch (e: any) {
      setSnackBar({
        toastName: 'Get Error',
        severity: 'error',
        message: `로딩 실패 ${e.response?.data.code}`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
    getSeasonList();
  }, []);

  const deleteHandler = async (deleteId: number) => {
    try {
      await instanceInManage.delete(`/seasons/${deleteId}`);
      setSnackBar({
        toastName: 'Season Delete',
        severity: 'success',
        message: `성공적으로 삭제되었습니다! `,
        clicked: true,
      });
    } catch (e: any) {
      setSnackBar({
        toastName: 'Delete Error',
        severity: 'error',
        message: `삭제 실패 ${e.response?.data.code}`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableFormat['season'].columns.map((columnName) => (
                <TableCell className={styles.tableHeaderItem} key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {useSeasonList.seasonList.map((seasonL: ISeason, index: number) => (
              <TableRow key={index}>
                {tableFormat['season'].columns.map(
                  (columnName, index: number) => (
                    <TableCell className={styles.tableBodyItem} key={index}>
                      {columnName === 'startTime' ||
                      columnName === 'endTime' ? (
                        seasonL[columnName as keyof ISeason]
                          ?.toString()
                          .replace('T', ' ')
                      ) : columnName === 'edit' ? (
                        seasonL['status'] === 'PAST' ? (
                          <div>과거 시즌입니다 !</div>
                        ) : seasonL['status'] === 'CURRENT' ? (
                          <div>
                            <button
                              className={styles.editBtn}
                              onClick={() => {
                                setModal({
                                  modalName: 'ADMIN-SEASON_EDIT',
                                  ISeason: seasonL,
                                });
                              }}
                            >
                              수정
                            </button>
                          </div>
                        ) : seasonL['status'] === 'FUTURE' ? (
                          <div>
                            <button
                              className={styles.editBtn}
                              onClick={() => {
                                setModal({
                                  modalName: 'ADMIN-SEASON_EDIT',
                                  ISeason: seasonL,
                                });
                              }}
                            >
                              수정
                            </button>
                            <button
                              className={styles.editBtn}
                              onClick={() => deleteHandler(seasonL.seasonId)}
                            >
                              삭제
                            </button>
                          </div>
                        ) : (
                          <div>error status</div>
                        )
                      ) : (
                        seasonL[columnName as keyof ISeason]?.toString()
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
