import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';

function useColorMode() {
  const setColorMode = useSetRecoilState(colorModeState);
  const resetColorMode = useResetRecoilState(colorModeState);

  useEffect(() => {
    setColorMode('BOTH');
    return () => {
      resetColorMode();
    };
  }, []);
}

export default useColorMode;
