import { Dispatch, SetStateAction, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import styles from 'styles/modal/store/ColorPicker.module.scss';

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <>
      <div className={styles.container}>
        <div
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
        <HexColorPicker
          color={color}
          onChange={setColor}
          className={styles.colorPicker}
          style={{ width: 'auto' }}
        />
      </div>
    </>
  );
}
