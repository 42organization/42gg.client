import Image from 'next/image';
import classNames from 'classnames';
import { CustomImageProps } from 'types/agenda/utils/customImageTypes';
import styles from 'styles/agenda/utils/CustomImage.module.scss';

// 해당 컴포넌트 부모 태그에서 width, height 설정해야 합니다.
const CustomImage = ({ src, alt, addClass }: CustomImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={classNames(styles.customImage, addClass)}
    />
  );
};

export default CustomImage;
