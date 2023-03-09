import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@mui/material';
import styles from 'styles/admin/season/SeasonList.module.scss';
import { tableFormat } from 'constants/admin/table';
import { SyntheticEvent, useEffect, useState } from 'react';
import instance from 'utils/axios';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../../utils/recoil/modal';

interface ISeason {
  id: number;
  seasonMode: string;
  seasonName: string;
  startTime: Date;
  endTime: Date;
  startPpp: number;
  pppGap: number;
  status: number;
}

interface ISeasonTable {
  mode: string;
  seasonList: ISeason[];
}

const VAL_SEASON_MODE: { [key: number]: string } = {
  0: 'both',
  1: 'rank',
  2: 'normal',
};
export default function SeasonList() {
  const setModal = useSetRecoilState(modalState);
  const [seasonList, setSeasonList] = useState<ISeasonTable>({
    mode: '',
    seasonList: [],
  });
  const [tabVal, setTabVal] = useState<number>(0);
  const [selectedSeasonMode, setSelectedSeasonMode] = useState<string>(
    VAL_SEASON_MODE[tabVal]
  );

  const getSeasonList = async (mode: string) => {
    try {
      const res = await instance.get(`pingpong/admin/season/${mode}`);
      console.log(res.data);
      setSeasonList({ ...res.data });
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSeasonList(selectedSeasonMode);
  }, [selectedSeasonMode]);

  return (
    <div className={styles.container}>
      <Tabs
        value={tabVal}
        onChange={(e: SyntheticEvent, newVal: number) => {
          setTabVal(newVal);
          setSelectedSeasonMode(VAL_SEASON_MODE[newVal]);
        }}
      >
        <Tab label='BOTH' />
        <Tab label='RANK' />
        <Tab label='NORMAL' />
      </Tabs>

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
            {seasonList.seasonList.map((seasonL: ISeason, index: number) => (
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
                        seasonL['status'] === 0 ? (
                          <div>과거 시즌입니다 !</div>
                        ) : seasonL['status'] === 1 ? (
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
                        ) : seasonL['status'] === 2 ? (
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
                            <button className={styles.editBtn}>삭제</button>
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
