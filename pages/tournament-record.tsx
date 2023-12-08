import { useState, useRef, useEffect } from 'react';
import { SwiperRef } from 'swiper/react';
import { TournamentInfo } from 'types/tournamentTypes';
import LeagueButtonGroup from 'components/tournament-record/LeagueButtonGroup';
import UserTournamentBracket from 'components/tournament-record/UserTournamentBracket';
import WinnerSwiper from 'components/tournament-record/WinnerSwiper';
import styles from 'styles/tournament-record/TournamentRecord.module.scss';

export default function TournamentRecord() {
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>();
  const [selectedType, setSelectedType] = useState<string>('ROOKIE');
  const swiperRef = useRef<SwiperRef>(null);
  const endTime = tournamentInfo ? new Date(tournamentInfo.endTime) : null;

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current?.swiper.slideTo(0, 0); // index, speed
    }
  }, [selectedType]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>명예의 전당</h1>
      <LeagueButtonGroup onSelect={setSelectedType} />
      <WinnerSwiper
        type={selectedType}
        size={5}
        setTournamentInfo={setTournamentInfo}
        ref={swiperRef}
      />
      <div className={styles.winnerInfoContainer}>
        <p className={styles.userId}>{tournamentInfo?.winnerIntraId}</p>
        <p className={styles.gameInfo}>
          {tournamentInfo?.title}{' '}
          <span className={styles.highlighted}>우승자</span>
        </p>
        <p className={styles.date}>{endTime?.toLocaleDateString()}</p>
      </div>
      <UserTournamentBracket tournamentId={tournamentInfo?.tournamentId} />
    </div>
  );
}
