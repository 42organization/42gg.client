import React, {
  useMemo,
  useCallback,
  SetStateAction,
  forwardRef,
  Ref,
} from 'react';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass, SwiperRef } from 'swiper/react';
import { TournamentData, TournamentInfo } from 'types/tournamentTypes';
import { InfiniteScroll } from 'utils/infinityScroll';
import { mockInstance } from 'utils/mockAxios';
import styles from 'styles/tournament-record/WinnerSwiper.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import WinnerProfileImage from './WinnerProfileImage';

interface WinnerSwiperProps {
  type: string;
  size: number;
  setTournamentInfo: React.Dispatch<SetStateAction<TournamentInfo | undefined>>;
}

const WinnerSwiper = forwardRef(
  (props: WinnerSwiperProps, ref: Ref<SwiperRef> | undefined) => {
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

    const { data, hasNextPage, fetchNextPage } = InfiniteScroll<TournamentData>(
      ['tournamentData', props.type],
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
        ref={ref}
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
);

// forwardRef에 들어가는 익명함수에 대한 name
WinnerSwiper.displayName = 'WinnerSwiper';

export default WinnerSwiper;
