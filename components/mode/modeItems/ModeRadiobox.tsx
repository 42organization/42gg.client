import { SeasonMode } from 'types/mainType';
import styles from 'styles/mode/ModeRadiobox.module.scss';

interface ModeRadioboxProps {
  mode: SeasonMode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ModeRadiobox({ mode, onChange }: ModeRadioboxProps) {
  const modes: { type: SeasonMode; name: string }[] = [
    { type: 'BOTH', name: '전체' },
    { type: 'NORMAL', name: '일반' },
    { type: 'RANK', name: '랭크' },
  ];

  return (
    <div className={styles.modeButtons}>
      {modes.map(({ type, name }) => (
        <label key={type} htmlFor={type}>
          <input
            type='radio'
            id={type}
            value={type}
            onChange={onChange}
            checked={mode === type}
          />
          <div className={styles.modeButton}>{name}</div>
        </label>
      ))}
    </div>
  );
}
