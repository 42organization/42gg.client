import { StoreManualMode } from 'types/takgu/storeTypes';
import { RadioBoxWrapper } from 'components/takgu/mode/modeItems/RadioBoxWrapper';
import styles from 'styles/takgu/mode/ModeRadiobox.module.scss';

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
