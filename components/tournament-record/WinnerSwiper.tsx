import React, { useMemo, useCallback, SetStateAction } from 'react';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { TournamentData, TournamentInfo } from 'types/tournamentTypes';
import { InfiniteScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/tournament-record/WinnerSwiper.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import WinnerProfileImage from './WinnerProfileImage';

interface WinnerSwiperProps {
  type: 'ROOKIE' | 'MASTER' | 'CUSTOM';
  size: number;
  setTournamentInfo: React.Dispatch<SetStateAction<TournamentInfo | undefined>>;
}

export default function WinnerSwiper(props: WinnerSwiperProps) {
  const fetchTournamentData = useCallback(
    async (page: number) => {
      console.log('Fetching more data...');
      const res = await mockInstance.get(
        `/tournament?page=${page}&type=${props.type}&size=${props.size}`
      );
      return res.data;
    },
    [props.type, props.size]
  );

  // TODO: error, isLoading 시 return 컴포넌트
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    InfiniteScroll<TournamentData>(
      'tournamentData',
      fetchTournamentData,
      'JC01'
    );

  const coverflowEffect = useMemo(
    () => ({
      rotate: 35,
      stretch: 0,
      depth: 500,
      slideShadows: true,
    }),
    []
  );

  const indexChangeHandler = useCallback(
    (swiper: SwiperClass) => {
      const slidesLength = swiper.slides.length;
      if (hasNextPage && swiper.activeIndex >= slidesLength - 3) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  return (
    <Swiper
      className={styles.swiper}
      slidesPerView={2.6}
      effect={'coverflow'}
      centeredSlides={true}
      coverflowEffect={coverflowEffect}
      modules={[EffectCoverflow]}
      onActiveIndexChange={indexChangeHandler}
    >
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.tournaments.length > 0 &&
            page.tournaments.map((tournament, index) => (
              <SwiperSlide key={tournament.tournamentId}>
                <WinnerProfileImage
                  tournament={tournament}
                  slideIndex={index + pageIndex * props.size}
                  setTournamentInfo={props.setTournamentInfo}
                />
              </SwiperSlide>
            ))}
        </React.Fragment>
      ))}
    </Swiper>
  );
}
