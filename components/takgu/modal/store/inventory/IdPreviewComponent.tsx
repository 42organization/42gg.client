import { RankUser, NormalUser } from 'types/rankTypes';
import { NormalListItem } from 'components/takgu/rank/NormalListItem';
import { RankListItem } from 'components/takgu/rank/RankListItem';
import styles from 'styles/takgu/modal/store/InventoryModal.module.scss';

type IdPreviewProps = {
  intraId: string;
  color: string;
};

export default function IdPreviewComponent({ intraId, color }: IdPreviewProps) {
  const rankDummyData: RankUser = {
    rank: 42,
    intraId: intraId,
    statusMessage: '상태메시지',
    ppp: 42,
    tierImageUri: '/image/takgu/fallBackSrc.jpeg', // NOTE : preview에서 쓸 이미지 생각해보기 (user data로 받아올 실제 이미지?)
    textColor: color,
  };
  const normalDummyData: NormalUser = {
    intraId: intraId,
    rank: 42,
    statusMessage: '상태메시지',
    exp: 42,
    textColor: color,
    level: 42,
  };
  return (
    <div className={styles.idPreviewContainer}>
      <div className={styles.title}>my ranking</div>
      <RankListItem user={rankDummyData} textColorPreview />
      <div className={styles.title}>my vip</div>
      <NormalListItem user={normalDummyData} textColorPreview />
    </div>
  );
}
