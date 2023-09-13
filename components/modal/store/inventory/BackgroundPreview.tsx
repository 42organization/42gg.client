import { RandomColors, BackgroundColors } from 'types/colorModeTypes';
import styles from 'styles/modal/store/BackgroundPreview.module.scss';

export default function BackgroundPreview({
  background,
}: {
  background: string;
}) {
  const colorList = new Map<RandomColors, BackgroundColors>([
    ['BASIC', 'BASIC'],
    ['COLOR1', 'COOL SKY'],
    ['COLOR2', 'MISTY MEADOW'],
    ['COLOR3', 'BUPE'],
    ['COLOR4', 'MANGO'],
    ['COLOR5', 'SEA BLIZZ'],
    ['COLOR6', 'OPA'],
    ['COLOR7', 'THE STRAIN'],
    ['COLOR8', 'WINDY'],
    ['COLOR9', 'MYSTIC'],
    ['COLOR10', 'DRACULA'],
    ['COLOR11', 'TRANQUIL'],
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
      ${styles[background.toLowerCase()]}`}
      ></div>
      <div className={styles.colorName}>
        {colorList.get(background as RandomColors)}
      </div>
    </div>
  );
}
