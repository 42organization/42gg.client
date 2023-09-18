import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { MdOutlineColorLens , MdColorLens } from 'react-icons/md';
import styles from 'styles/modal/store/ColorPicker.module.scss';

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const pickerHandler = useCallback(() => {
    setOpenPicker((prev) => !prev);
  }, []);

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
          onClick={pickerHandler}
        />
        {openPicker ? (
          <HexColorPicker
            color={color}
            onChange={setColor}
            className={styles.colorPicker}
            style={{ width: 'auto' }}
          />
        ) : null}
      </div>
    </>
  );
}
