import Image from 'next/image';
import React, { useState, useEffect, SetStateAction } from 'react';
import { useSwiper } from 'swiper/react';
import { TournamentInfo } from 'types/tournamentTypes';
import styles from 'styles/tournament-record/WinnerProfileImage.module.scss';

interface WinnerProfileImageProps {
  tournament: TournamentInfo;
  slideIndex: number;
  setTournamentInfo: React.Dispatch<SetStateAction<TournamentInfo | undefined>>;
}

export default function WinnerProfileImage({
  tournament,
  slideIndex,
  setTournamentInfo,
}: WinnerProfileImageProps) {
  const swiper = useSwiper();
  const [indexDiff, setIndexDiff] = useState(swiper.activeIndex - slideIndex);

  useEffect(() => {
    const swiperUpdate = () => {
      setIndexDiff(swiper.activeIndex - slideIndex);
    };
    swiper.on('slideChange', swiperUpdate);
    return () => {
      swiper.off('slideChange', swiperUpdate);
    };
  }, [swiper, slideIndex]);

  useEffect(() => {
    if (indexDiff === 0) {
      setTournamentInfo(tournament);
    }
  }, [indexDiff, tournament, setTournamentInfo]);

  function applyStyle() {
    if (indexDiff === 0) {
      setTournamentInfo(tournament);
      return styles.firstLayer;
    }
    return styles.secondLayer;
  }

  return (
    <div
      className={`${styles.winnerProfileImage} ${
        indexDiff > -2 && indexDiff < 2 && applyStyle()
      }`}
    >
      <Image
        src={tournament.winnerImageUrl}
        fill
        style={{ objectFit: 'cover' }}
        alt={tournament.winnerIntraId}
        priority
      />
    </div>
  );
}
