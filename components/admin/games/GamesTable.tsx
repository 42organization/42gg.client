import { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PageNation from 'components/Pagination';
import { tableFormat } from 'constants/admin/table';
import { IGames, IGameLog } from 'types/admin/gameLogTypes';
import instance from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import AdminSearchBar from '../common/AdminSearchBar';
import style from 'styles/admin/games/GamesTable.module.scss';

export default function GamesTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [gameInfo, setGameInfo] = useState<IGames>({
    gameLog: [],
    totalPage: 1,
    currentPage: 1,
  });

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getAllGames = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/games?season=0&page=${currentPage}&size=5`
      );

      setGameInfo({
        gameLog: res.data.gameLogList.map((game: IGameLog) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(game.startAt)
          );
          return {
            ...game,
            startAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS07');
    }
  }, [currentPage]);

  const getUserGames = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/games?q=${intraId}&page=${currentPage}&size=10`
      );
      setGameInfo({
        gameLog: res.data.gameLog.map((game: IGameLog) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(game.startAt)
          );
          return {
            ...game,
            startAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS08');
    }
  }, [intraId, currentPage]);

  useEffect(() => {
    intraId ? getUserGames() : getAllGames();
  }, [intraId, getAllGames, getUserGames]);

  return (
    <>
      <div className={style.gamesWrap}>
        <div className={style.header}>
          <div className={style.title}>게임 관리</div>
          <AdminSearchBar initSearch={initSearch} />
        </div>
        <TableContainer className={style.tableContainer} component={Paper}>
          <Table className={style.table}>
            <TableHead className={style.tableHeader}>
              <TableRow>
                {tableFormat['games'].columns.map((column: string) => (
                  <TableCell className={style.tableHeaderItem} key={column}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={style.tableBody}>
              {gameInfo.gameLog.length > 0 ? (
                gameInfo.gameLog.map((game: IGameLog) => (
                  <TableRow key={game.gameId}>
                    {tableFormat['games'].columns.map((column: string) => {
                      if (column === 'team1' || column === 'team2') {
                        return (
                          <TableCell
                            className={style.tableBodyItem}
                            key={game[column].intraId1}
                          >
                            <div
                              style={{
                                background: game[column].win
                                  ? 'lawngreen'
                                  : 'orangered',
                              }}
                            >
                              <div>
                                {game[column].intraId1 +
                                  ' ' +
                                  (game[column].intraId2 ?? '')}
                              </div>
                              <div>{game[column].score}점</div>
                            </div>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            className={style.tableBodyItem}
                            key={column}
                          >
                            {game[column as keyof IGameLog]?.toString()}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>게임 기록이 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={style.pageNationContainer}>
          <PageNation
            curPage={gameInfo.currentPage}
            totalPages={gameInfo.totalPage}
            pageChangeHandler={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
