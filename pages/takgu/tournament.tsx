import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/takgu/modal';
import TournamentCard from 'components/takgu/tournament/TournamentCard';
import UserTournamentBraket from 'components/takgu/tournament/UserTournamentBracket';
import useBeforeLiveTournamentData from 'hooks/takgu/tournament/useBeforeLiveTournamentData';
import styles from 'styles/takgu/tournament/TournamentContainer.module.scss';

export default function Tournament() {
  const { data, isLoading } = useBeforeLiveTournamentData();
  const setModal = useSetRecoilState(modalState);

  const openManual = () => {
    setModal({ modalName: 'TOURNAMENT-MANUAL' });
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Tournament</h1>
        <div className={styles.buttonWrap}>
          <button className={styles.manual} onClick={openManual}>
            경기 규칙
          </button>
        </div>
      </div>
      <div className={styles.tournamentText}> 예정된 토너먼트 </div>
      {data?.beforeTournament.length === 0 ? (
        <div className={styles.noTournamentText}>
          예정된 토너먼트가 없습니다.
        </div>
      ) : (
        <div className={styles.tournamentCardContainer}>
          {data?.beforeTournament.map((tournament) => (
            <div className={styles.cardContainer} key={tournament.tournamentId}>
              <TournamentCard {...tournament} page='tournament' />
            </div>
          ))}
        </div>
      )}
      <div className={styles.tournamentText}> 진행중인 토너먼트 </div>
      {data?.liveTournament?.length === 0 ? (
        <div className={styles.noTournamentText}>
          진행중인 토너먼트가 없습니다.
        </div>
      ) : (
        data?.liveTournament.map((tournament) => (
          <>
            <TournamentCard {...tournament} page='tournament/playing' />
            <UserTournamentBraket
              tournamentId={tournament.tournamentId}
              queryStaleTime={60 * 1000}
              state={tournament.status}
            />
          </>
        ))
      )}
    </div>
  );
}
