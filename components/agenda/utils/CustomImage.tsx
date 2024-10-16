import Image from 'next/image';
import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { CustomImageProps } from 'types/agenda/utils/customImageTypes';
import styles from 'styles/agenda/utils/CustomImage.module.scss';

// 해당 컴포넌트 부모 태그에서 width, height 설정해야 합니다.
const CustomImage = ({
  src,
  alt,
  addClass,
  isProfileImage,
  name,
  description,
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleError = () => {
    isProfileImage
      ? setImgSrc('/image/agenda/default-profile.svg')
      : setImgSrc('/image/agenda/42-icon.svg');
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return src ? (
    <div
      className={styles.imageContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imgSrc}
        key={imgSrc}
        alt={alt}
        width={30}
        height={30}
        className={classNames(styles.customImage, addClass)}
        priority={true}
        onError={handleError}
      />
      {isHovered && (
        <div className={styles.hoverContainer}>
          <div className={styles.hoverName}>{name}</div>
          <div className={styles.hoverDescription}>{description}</div>
        </div>
      )}
    </div>
  ) : null;
};

export default CustomImage;
