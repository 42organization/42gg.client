import { RadioBoxWrapper } from 'components/mode/modeItems/RadioBoxWrapper';
import { useEffect } from 'react';
import styles from 'styles/mode/ModeRadiobox.module.scss';
import { StoreMode } from 'types/inventoryTypes';

type StoreModeRadioBoxProps = {
  mode: StoreMode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StoreModeRadioBox({
  mode,
  onChange,
}: StoreModeRadioBoxProps) {
  const modes: { type: StoreMode; name: string }[] = [
    { type: 'BUY', name: '상점' },
    { type: 'INVENTORY', name: '보관함' },
  ];

  return (
    <RadioBoxWrapper page='STORE'>
      {modes.map(({ type, name }) => (
        <label key={type}>
          <input
            type='radio'
            id={type}
            value={type}
            onChange={onChange}
            checked={mode === type}
          />
          <div className={`${styles.modeButton}`}>{name}</div>
        </label>
      ))}
    </RadioBoxWrapper>
  );
}
