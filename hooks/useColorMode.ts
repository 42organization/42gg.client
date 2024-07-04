import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { colorModeState } from 'utils/recoil/takgu/colorMode';

function useColorMode(page: 'GAME' | 'MATCH' | 'RANK') {
  const setColorMode = useSetRecoilState(colorModeState);
  const resetColorMode = useResetRecoilState(colorModeState);

  useEffect(() => {
    if (page === 'RANK') {
      setColorMode('RANK');
    } else {
      setColorMode('BOTH');
    }
    return () => {
      resetColorMode();
    };
  }, [page]);
}

export default useColorMode;
