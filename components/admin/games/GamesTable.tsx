import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import PageNation from 'components/Pagination';
import { tableFormat } from 'constants/admin/table';
import { useCallback, useEffect, useState } from 'react';
import style from 'styles/admin/games/GamesTable.module.scss';
import { IGames, ITeam } from 'types/admin/gameLogTypes';
import { dateToString } from 'utils/handleTime';
import AdminSearchBar from '../common/AdminSearchBar';

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
      const res = await axios.get(
        `http://localhost:3000/api/admin/games?season=0&page=${currentPage}&size=10`
      );

      setGameInfo({
        gameLog: res.data.gameLog.map((game: IGameLog) => {
          return {
            ...game,
            startAt: dateToString(new Date(game.startAt)),
            team1: game.team1.map((member: ITeam) => {
              return {
                ...member,
              };
            }),
            team2: game.team2.map((member: ITeam) => {
              return {
                ...member,
              };
            }),
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
      const res = await axios.get(
        `http://localhost:3000/api/admin/games?q=${intraId}&page=${currentPage}&size=10`
      );
      setGameInfo({
        gameLog: res.data.gameLog.map((game: IGameLog) => {
          return {
            ...game,
            startAt: dateToString(new Date(game.startAt)),
            team1: game.team1.map((member: ITeam) => {
              return {
                ...member,
              };
            }),
            team2: game.team2.map((member: ITeam) => {
              return {
                ...member,
              };
            }),
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

  if (!gameInfo.gameLog) return <div>게임 로그가 없습니다.</div>;

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
              {gameInfo.gameLog.map((game: IGameLog) => (
                <TableRow key={game.gameId}>
                  {tableFormat['games'].columns.map((column: string) => {
                    if (column === 'team1' || column === 'team2') {
                      return game[column].map((member: ITeam) => {
                        return (
                          <TableCell
                            className={style.tableBodyItem}
                            key={member.intraId1}
                          >
                            <div
                              style={{
                                background: member.win
                                  ? 'lawngreen'
                                  : 'orangered',
                              }}
                            >
                              <div>
                                {member.intraId1 +
                                  ' ' +
                                  (member.intraId2 ?? '')}
                              </div>
                              <div>{member.score}점</div>
                            </div>
                          </TableCell>
                        );
                      });
                    } else {
                      return (
                        <TableCell className={style.tableBodyItem} key={column}>
                          {game[column as keyof IGameLog].toString()}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
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
export interface IGameLog {
  gameId: number;
  startAt: Date;
  playTime: string;
  mode: string;
  team1: ITeam[];
  team2: ITeam[];
}
