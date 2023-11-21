import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import { TournamentInfo } from 'types/tournamentTypes';
import styles from 'styles/tournament-record/WinnerProfileImage.module.scss';

interface WinnerProfileImageProps {
  tournament: TournamentInfo;
  slideIndex: number;
}

export default function WinnerProfileImage({
  tournament,
  slideIndex,
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

  function getSlideStyle() {
    if (indexDiff === 0) {
      return styles.firstLayer;
    }
    return styles.secondLayer;
  }

  return (
    <div
      className={`${styles.winnerProfileImage} ${
        indexDiff > -2 && indexDiff < 2 && getSlideStyle()
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
