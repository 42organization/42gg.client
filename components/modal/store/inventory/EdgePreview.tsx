import { EdgeColors, RandomColors } from 'types/colorModeTypes';
import PlayerImage from 'components/PlayerImage';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/modal/store/EdgePreview.module.scss';

const edgeColorList = new Map<RandomColors, EdgeColors>([
  ['BASIC', 'BASIC'],
  ['COLOR1', 'RICH METAL'],
  ['COLOR2', 'FRUIT BLEND'],
  ['COLOR3', 'SEASHORE'],
  ['COLOR4', 'GROWN EARLY'],
  ['COLOR5', 'FLYING LEMON'],
  ['COLOR6', 'NIGHT SKY'],
  ['COLOR7', 'HIGHFLIGHT'],
  ['COLOR8', 'FABLED SUNSET'],
  ['COLOR9', 'MORNING VIBE'],
  ['COLOR10', 'NEON GREEN'],
  ['COLOR11', 'MAGIC PINK'],
  ['COLOR12', 'SOFT CHERISH'],
  ['COLOR13', 'PALO ALTO'],
  ['COLOR14', 'TWILIGHT'],
  ['COLOR15', 'NORTH MIRACLE'],
  ['COLOR16', 'GAGARIN VIEW'],
]);

export default function EdgePreview({ edge }: { edge: RandomColors }) {
  const user = useUser();

  if (!user) return null;

  const { userImageUri } = user;

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <div className={styles.title}>{edgeColorList.get(edge)}</div>
        <PlayerImage
          src={userImageUri}
          styleName={`mainProfile ${edge.toLowerCase()}`}
          size={30}
        />
      </div>
    </div>
  );
}
