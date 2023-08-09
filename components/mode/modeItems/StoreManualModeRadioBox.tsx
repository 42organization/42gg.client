import { RadioBoxWrapper } from 'components/mode/modeItems/RadioBoxWrapper';
import { StoreManualMode } from 'types/storeTypes';
import styles from 'styles/mode/ModeRadiobox.module.scss';

type StoreManualModeRadioBoxProps = {
  mode: StoreManualMode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StoreManualModeRadioBox({
  mode,
  onChange,
}: StoreManualModeRadioBoxProps) {
  const modes: { type: StoreManualMode; name: string }[] = [
    { type: 'COIN_POLICY', name: '코인 정책' },
    { type: 'STORE_POLICY', name: '상점 이용' },
  ];

  return (
    <RadioBoxWrapper page='STORE_MANUAL'>
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
