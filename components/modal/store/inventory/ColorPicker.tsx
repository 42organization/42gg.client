import { Dispatch, SetStateAction, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import styles from 'styles/modal/store/ColorPicker.module.scss';

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => setShowPicker(!showPicker)}
          style={{ backgroundColor: color }}
          className={styles.colorPreview}
        />
        <HexColorInput
          color={color}
          onChange={setColor}
          prefixed
          alpha
          className={styles.colorInput}
        />
        {showPicker && (
          <HexColorPicker
            color={color}
            onChange={setColor}
            className={styles.colorPicker}
            style={{ width: 'auto' }}
          />
        )}
      </div>
    </>
  );
}