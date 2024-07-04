import Image from 'next/image';
import React, { useState, useEffect, SetStateAction } from 'react';
import { useSwiper } from 'swiper/react';
import { TournamentInfo } from 'types/tournamentTypes';
import styles from 'styles/takgu/tournament-record/WinnerProfileImage.module.scss';

interface WinnerProfileImageProps {
  tournament: TournamentInfo;
  type: string;
  slideIndex: number;
  setTournamentInfo: React.Dispatch<SetStateAction<TournamentInfo | undefined>>;
}

export default function WinnerProfileImage({
  tournament,
  type,
  slideIndex,
  setTournamentInfo,
}: WinnerProfileImageProps) {
  const swiper = useSwiper();
  const [indexDiff, setIndexDiff] = useState(swiper.activeIndex - slideIndex);
  const [imageUrl, setImageUrl] = useState(tournament.winnerImageUrl);

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

  function applyLayerStyle() {
    if (indexDiff === 0) {
      return styles.firstLayer;
    }
    return styles.secondLayer;
  }

  return (
    <div
      className={`${styles.winnerProfileImage} ${
        indexDiff > -2 && indexDiff < 2 && applyLayerStyle()
      } ${styles[type]}`}
    >
      <Image
        src={imageUrl ?? '/image/takgu/fallBackSrc.jpeg'}
        fill
        style={{ objectFit: 'cover' }}
        alt={tournament.winnerIntraId ?? 'fallback image'}
        priority
        onError={() => {
          setImageUrl('/image/takgu/fallBackSrc.jpeg');
        }}
      />
    </div>
  );
}
