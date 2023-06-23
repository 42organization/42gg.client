import { SeasonMode } from 'types/mainType';
import styles from 'styles/mode/ModeRadiobox.module.scss';

interface ModeRadioboxProps {
  mode: SeasonMode;
  page: 'GAME' | 'MATCH' | 'MANUAL';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zIndexList?: boolean;
}

export default function ModeRadiobox({
  mode,
  page,
  onChange,
  zIndexList,
}: ModeRadioboxProps) {
  const modes: { type: SeasonMode; name: string }[] = [
    { type: 'BOTH', name: '전체' },
    { type: 'NORMAL', name: '일반' },
    { type: 'RANK', name: '랭크' },
  ];

  return (
    <div
      className={`${styles.modeButtons} 
      ${styles[page.toLowerCase()]}
      ${zIndexList && styles['zIndexListButton']}`}
    >
      {modes.map(({ type, name }) => (
        <label key={type}>
          <input
            type='radio'
            id={type}
            value={type}
            onChange={onChange}
            checked={mode === type}
          />
          <div className={`${styles.modeButton} ${styles[mode.toLowerCase()]}`}>
            {name}
          </div>
        </label>
      ))}
    </div>
  );
}
