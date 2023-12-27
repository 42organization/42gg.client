import { useState, useRef, useEffect } from 'react';
import { SwiperRef } from 'swiper/react';
import { TournamentInfo } from 'types/tournamentTypes';
import UserTournamentBracket from 'components/tournament/UserTournamentBracket';
import LeagueButtonGroup from 'components/tournament-record/LeagueButtonGroup';
import WinnerSwiper from 'components/tournament-record/WinnerSwiper';
import WinnerTournamentInfo from 'components/tournament-record/WinnerTournamentInfo';
import styles from 'styles/tournament-record/TournamentRecord.module.scss';

export default function TournamentRecord() {
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>();
  const [selectedType, setSelectedType] = useState<string>('ROOKIE');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current?.swiper.slideTo(0, 0); // 이동할 슬라이드 인덱스, 이동 속도
    }
  }, [selectedType]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Hall of Fame</h1>
      <LeagueButtonGroup onSelect={setSelectedType} />
      <WinnerSwiper
        type={selectedType}
        size={5}
        setTournamentInfo={setTournamentInfo}
        ref={swiperRef}
        setIsEmpty={setIsEmpty}
      />
      {isEmpty ? (
        <p>종료된 토너먼트가 없습니다!</p>
      ) : (
        <>
          <WinnerTournamentInfo tournamentInfo={tournamentInfo} />
          <UserTournamentBracket tournamentId={tournamentInfo?.tournamentId} />
        </>
      )}
    </div>
  );
}
