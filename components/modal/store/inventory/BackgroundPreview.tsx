import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import useBasicProfile from 'hooks/users/useBasicProfile';
import styles from 'styles/modal/store/BackgroundPreview.module.scss';

export default function BackgroundPreview() {
  const { intraId } = useRecoilValue(userState);
  const { backgroundType } = useBasicProfile({ profileId: intraId });
  // TODO: ui gradient에서 색상 이름 가져오기
  const colorList = new Map([
    ['BASIC', 'BASIC'],
    ['COLOR1', 'TRANQUIL'],
    ['COLOR2', 'BLUE GREEN'],
    ['COLOR3', 'MIDNIGHT'],
    ['COLOR4', 'ORANGE'],
    ['COLOR5', 'GRASS GREEN'],
    ['COLOR6', 'LEMON BLUE'],
    ['COLOR7', 'DRACULA'],
    ['COLOR8', 'MINT GREEN'],
    ['COLOR9', 'STEEL GRAY'],
    ['COLOR10', 'BLOOD RED'],
    ['COLOR11', 'BLUE SKY'],
    ['COLOR12', 'OCEAN BLUE'],
    ['COLOR13', 'PINK BLUE'],
    ['COLOR14', 'SUNSET PINK'],
    ['COLOR15', 'DARK NAVY'],
    ['COLOR16', 'ORANGE GREEN'],
  ]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles['player']}
      ${styles[backgroundType.toLowerCase()]}`}
      ></div>
      <div className={styles.colorName}>{colorList.get(backgroundType)}</div>
    </div>
  );
}
