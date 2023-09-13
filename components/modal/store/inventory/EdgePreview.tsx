import PlayerImage from 'components/PlayerImage';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/modal/store/EdgePreview.module.scss';

export default function EdgePreview({ edge }: { edge: string }) {
  const user = useUser();

  if (!user) return null;

  const { userImageUri } = user;

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
