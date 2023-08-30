import { RandomColors, BackgroundColors } from 'types/colorModeTypes';
import styles from 'styles/modal/store/BackgroundPreview.module.scss';

export default function BackgroundPreview({
  backgroundType,
}: {
  backgroundType: string;
}) {
  const colorList = new Map<RandomColors, BackgroundColors>([
    ['BASIC', 'BASIC'],
    ['COLOR1', 'TRANQUIL'],
    ['COLOR2', 'WINDY'],
    ['COLOR3', 'BUPE'],
    ['COLOR4', 'MANGO'],
    ['COLOR5', 'MISTY MEADOW'],
    ['COLOR6', 'OPA'],
    ['COLOR7', 'DRACULA'],
    ['COLOR8', 'SEA BLIZZ'],
    ['COLOR9', 'MYSTIC'],
    ['COLOR10', 'THE STRAIN'],
    ['COLOR11', 'COOL SKY'],
    ['COLOR12', 'JODHPUR'],
    ['COLOR13', 'HAZEL'],
    ['COLOR14', 'RADAR'],
    ['COLOR15', 'ROYAL BLUE'],
    ['COLOR16', 'MEGATRON'],
  ]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles['player']}
      ${styles[backgroundType.toLowerCase()]}`}
      ></div>
      <div className={styles.colorName}>
        {colorList.get(backgroundType as RandomColors)}
      </div>
    </div>
  );
}
