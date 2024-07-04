import React, { useMemo, SetStateAction, forwardRef, Ref } from 'react';
import { InfiniteData } from 'react-query';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from 'swiper/react';
import { TournamentInfo, TournamentData } from 'types/tournamentTypes';
import styles from 'styles/takgu/tournament-record/WinnerSwiper.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import WinnerProfileImage from './WinnerProfileImage';

interface WinnerSwiperProps {
  tournamentData: InfiniteData<TournamentData> | undefined;
  type: string;
  size: number;
  setTournamentInfo: React.Dispatch<SetStateAction<TournamentInfo | undefined>>;
  onIndexChange: (swiper: SwiperClass) => void;
}

const WinnerSwiper = forwardRef(
  (
    {
      tournamentData,
      type,
      size,
      setTournamentInfo,
      onIndexChange,
    }: WinnerSwiperProps,
    ref: Ref<SwiperRef> | undefined
  ) => {
    const coverflowEffect = useMemo(
      () => ({
        rotate: 35,
        stretch: 0,
        depth: 500,
        slideShadows: true,
      }),
      []
    );

    return (
      <Swiper
        className={styles.swiper}
        slidesPerView={2.6}
        effect={'coverflow'}
        centeredSlides={true}
        coverflowEffect={coverflowEffect}
        modules={[EffectCoverflow]}
        onActiveIndexChange={onIndexChange}
        ref={ref}
      >
        {tournamentData?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.tournaments.length > 0 &&
              page.tournaments.map((tournament, index) => (
                <SwiperSlide
                  className={styles.swiperSlide}
                  key={tournament.tournamentId}
                >
                  <WinnerProfileImage
                    tournament={tournament}
                    type={type}
                    slideIndex={index + pageIndex * size}
                    setTournamentInfo={setTournamentInfo}
                  />
                </SwiperSlide>
              ))}
          </React.Fragment>
        ))}
      </Swiper>
    );
  }
);

// forwardRef에 들어가는 익명함수에 대한 name
WinnerSwiper.displayName = 'WinnerSwiper';

export default WinnerSwiper;
