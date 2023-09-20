import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { RandomColors } from 'types/colorModeTypes';
import { colorModeState } from 'utils/recoil/colorMode';

function useProfileColorMode(color: RandomColors) {
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
