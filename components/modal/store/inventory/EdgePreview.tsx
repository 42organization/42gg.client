import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/modal/store/EdgePreview.module.scss';

export default function EdgePreview({ edge }: { edge: string }) {
  const { userImageUri } = useRecoilValue(userState);

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <PlayerImage
          src={userImageUri}
          styleName={`mainProfile ${edge.toLowerCase()}`}
          size={30}
        />
      </div>
    </div>
  );
}
