import { Mode } from 'types/mainType';
import styles from 'styles/RankList.module.scss';
import { useEffect } from 'react';

interface RankListFrameProps {
  children: React.ReactNode;
  isMain: boolean;
  modeType?: Mode;
}

export default function RankListFrame({
  children,
  isMain,
  modeType,
}: RankListFrameProps) {
  const mainTitle = modeType === 'rank' ? 'Champion' : 'Vips';
  const divisionList =
    modeType === 'rank'
      ? ['순위', 'intraId', '상태메시지', '점수']
      : ['열정', 'intraId(Lv)', '상태메시지', '경험치'];

  return (
    <>
      {isMain ? (
        <div className={styles.mainContainer}>
          <div className={styles.mainTitle}>{mainTitle}</div>
          {children}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.division}>
            {divisionList.map((item: string) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          {children}
        </div>
      )}
    </>
  );
}
