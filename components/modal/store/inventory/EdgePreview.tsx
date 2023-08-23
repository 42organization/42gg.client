import PlayerImage from 'components/PlayerImage';
import styles from 'styles/modal/store/EdgePreview.module.scss';

const edgeColorList = [
  'BASIC',
  'EDGE1',
  'EDGE2',
  'EDGE3',
  'EDGE4',
  'EDGE5',
  'EDGE6',
  'EDGE7',
  'EDGE8',
  'EDGE9',
  'EDGE10',
  'EDGE11',
  'EDGE12',
  'EDGE13',
  'EDGE14',
  'EDGE15',
  'EDGE16',
];

export function EdgePreview() {
  return (
    <div className={styles.container}>
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
