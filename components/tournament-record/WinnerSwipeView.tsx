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

  function getImagePositionClass(index: number) {
    if (index === currentImageIndex + 2) {
      return `${styles.thirdLayer} ${styles.thirdLeft}`;
    }
    if (index === currentImageIndex + 1) {
      return `${styles.secondLayer} ${styles.secondLeft}`;
    }
    if (index === currentImageIndex) {
      return `${styles.firstLayer}`;
    }
    if (index === currentImageIndex - 1) {
      return `${styles.secondLayer} ${styles.secondRight}`;
    }
    if (index === currentImageIndex - 2) {
      return `${styles.thirdLayer} ${styles.thirdRight}`;
    }
    return null;
  }

  return (
    <div
      className={styles.swipeViewContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, index) => {
        if (index < currentImageIndex - 2 || index > currentImageIndex + 2) {
          return;
        }
        return (
          <div
            key={src + index}
            className={`${styles.winnerImageContainer} ${getImagePositionClass(
              index
            )}`}
          >
            <Image
              src={src}
              fill={true}
              style={{ objectFit: 'cover' }}
              alt='sample image'
            />
          </div>
        );
      })}
    </div>
  );
}
