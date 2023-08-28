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

// EDGE 전체 색상표
export function EdgePreviewTemp() {
  const edgeColorList = [
    'BASIC',
    'COLOR1',
    'COLOR2',
    'COLOR3',
    'COLOR4',
    'COLOR5',
    'COLOR6',
    'COLOR7',
    'COLOR8',
    'COLOR9',
    'COLOR10',
    'COLOR11',
    'COLOR12',
    'COLOR13',
    'COLOR14',
    'COLOR15',
    'COLOR16',
  ];

  return (
    <div className={styles.colorContainer}>
      <div className={styles.preview}>
        {edgeColorList.map((color) => (
          <div key={color}>
            <div>{color}</div>
            <PlayerImage
              src='/image/fallBackSrc.jpeg'
              styleName={`mainProfile ${color.toLowerCase()}`}
              size={30}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
