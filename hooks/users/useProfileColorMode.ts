import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';
import { BackgroundColor } from 'types/colorModeTypes';

function useProfileColorMode(color: BackgroundColor) {
  const setColorMode = useSetRecoilState(colorModeState);
  const resetColorMode = useResetRecoilState(colorModeState);

  useEffect(() => {
    setColorMode(color);
    return () => {
      resetColorMode();
    };
  }, [color]);
}

export default useProfileColorMode;
