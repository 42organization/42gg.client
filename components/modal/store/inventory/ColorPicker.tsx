import { Dispatch, SetStateAction } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { MdOutlineColorLens, MdColorLens } from 'react-icons/md';
import styles from 'styles/modal/store/ColorPicker.module.scss';

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  openPicker: boolean;
  pickerHandler: () => void;
};

export default function ColorPicker({
  color,
  setColor,
  openPicker,
  pickerHandler,
}: ColorPickerProps) {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{ backgroundColor: color }}
          className={styles.colorPreview}
          onClick={pickerHandler}
        >
          {openPicker ? (
            <MdColorLens className={styles.icon} />
          ) : (
            <MdOutlineColorLens className={styles.icon} />
          )}
        </div>
        <HexColorInput
          color={color}
          onChange={setColor}
          prefixed
          alpha
          className={styles.colorInput}
        />
        {openPicker ? (
          <HexColorPicker
            color={color}
            onChange={setColor}
            onClick={(e) => e.stopPropagation()}
            className={styles.colorPicker}
            style={{ width: 'auto' }}
          />
        ) : null}
      </div>
    </>
  );
}
