import Image from 'next/image';
import React, { useState } from 'react';
import styles from 'styles/tournament-record/WinnerSwipeView.module.scss';
// import WinnerImageContainer from './WinnerImageContainer';

const images: string[] = [
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleSwipe(direction: string) {
    if (direction === 'left' && currentImageIndex > 0) {
      setCurrentImageIndex(() => {
        return currentImageIndex - 1;
      });
    } else if (direction === 'right' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(() => {
        return currentImageIndex + 1;
      });
    }
  }

  let touchStartX: number;

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50 && currentImageIndex > 0) {
      handleSwipe('left');
    } else if (touchEndX - touchStartX > 50) {
      handleSwipe('right');
    }
  }

  return (
    <div
      className={styles.swipeViewContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {currentImageIndex + 2 < images.length && (
        <div
          className={`${styles.winnerImageContainer} ${styles.thirdLayer} ${styles.thirdLeft}`}
        >
          <Image
            src={images[currentImageIndex + 2]}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt='sample image'
          />
        </div>
      )}
      {currentImageIndex + 1 < images.length && (
        <div
          className={`${styles.winnerImageContainer} ${styles.secondLayer} ${styles.secondLeft}`}
        >
          <Image
            src={images[currentImageIndex + 1]}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt='sample image'
          />
        </div>
      )}
      <div className={`${styles.winnerImageContainer} ${styles.firstLayer}`}>
        <Image
          src={images[currentImageIndex]}
          fill={true}
          style={{ objectFit: 'cover' }}
          alt='sample image'
        />
      </div>
      {currentImageIndex - 1 >= 0 && (
        <div
          className={`${styles.winnerImageContainer} ${styles.secondLayer} ${styles.secondRight}`}
        >
          <Image
            src={images[currentImageIndex - 1]}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt='sample image'
          />
        </div>
      )}
      {currentImageIndex - 2 >= 0 && (
        <div
          className={`${styles.winnerImageContainer} ${styles.thirdLayer} ${styles.thirdRight}`}
        >
          <Image
            src={images[currentImageIndex - 2]}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt='sample image'
          />
        </div>
      )}
    </div>
  );
}
