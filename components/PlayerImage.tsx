import Image from 'next/legacy/image';
import { useState } from 'react';
import styles from 'styles/PlayerImage.module.scss';
import fallBack from 'public/image/fallBackSrc.jpeg';

interface PlayerImageProps {
  src: string;
  size: number;
  styleName: string;
}

export default function PlayerImage({
  src,
  size,
  styleName,
}: PlayerImageProps) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = !src || imgError ? fallBack : src;
  return (
    <div className={styles[styleName]}>
      <div>
        <Image
          src={imgSrc}
          alt='prfImg'
          layout='fill'
          objectFit='cover'
          sizes={`${size}vw`}
          quality={`${size}`}
          unoptimized={imgError}
          onError={() => setImgError(true)}
          priority={true}
        />
      </div>
    </div>
  );
}
