import { Dispatch, SetStateAction } from 'react';
import { StoreMode } from 'types/storeTypes';
import StoreModeRadioBox from 'components/mode/modeItems/StoreModeRadioBox';

type StoreModeWrapProps = {
  currentMode: StoreMode;
  setStoreMode: Dispatch<SetStateAction<StoreMode>>;
};

export function StoreModeWrap({
  currentMode,
  setStoreMode,
}: StoreModeWrapProps) {
  console.log('StoreModeWrap: ', currentMode);

  return (
    // TODO: 매뉴얼 모달 띄우기
    <StoreModeRadioBox
      mode={currentMode}
      onChange={(e) => setStoreMode(e.target.value as StoreMode)}
    />
  );
}
