import Image from 'next/image';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import styles from 'styles/tournament-record/WinnerSwipeView.module.scss';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const dummyImages: string[] = [
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hyuim.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/taehkwon-a0d20e13-7726-4168-9751-8f946bf91388.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hyuim.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/taehkwon-a0d20e13-7726-4168-9751-8f946bf91388.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/taehkwon-a0d20e13-7726-4168-9751-8f946bf91388.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hyuim.jpeg',
  'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/jincpark.jpeg',
];

export default function WinnerSwipeView() {
  function indexChangeHandler(swiper: SwiperClass) {
    console.log(swiper);
  }

  return (
    <Swiper
      className={styles.swiper}
      slidesPerView={5}
      effect={'coverflow'}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 15,
        stretch: 0,
        depth: 300,
        slideShadows: true,
      }}
      modules={[EffectCoverflow]}
      onActiveIndexChange={indexChangeHandler}
    >
      {dummyImages.map((src, index) => {
        return (
          <SwiperSlide key={src + index}>
            <div className={styles.swiperSlide}>
              <Image
                src={src}
                fill={true}
                style={{ objectFit: 'cover' }}
                alt='sample image'
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
