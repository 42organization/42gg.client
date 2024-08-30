import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { CustomImageProps } from 'types/agenda/utils/customImageTypes';
import styles from 'styles/agenda/utils/CustomImage.module.scss';

// 해당 컴포넌트 부모 태그에서 width, height 설정해야 합니다.
const CustomImage = ({
  src,
  alt,
  addClass,
  isProfileImage,
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    isProfileImage
      ? setImgSrc('/image/agenda/default-profile.svg')
      : setImgSrc('/image/agenda/42-icon.svg');
  };

  return src ? (
    <Image
      src={imgSrc}
      alt={alt}
      width={30}
      height={30}
      className={classNames(styles.customImage, addClass)}
      priority={true}
      onError={handleError}
    />
  ) : null;
};

export default CustomImage;
