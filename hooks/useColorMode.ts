import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { colorModeState } from 'utils/recoil/colorMode';

function useColorMode(page: 'GAME' | 'MATCH' | 'RANK') {
  const setColorMode = useSetRecoilState(colorModeState);
  const resetColorMode = useResetRecoilState(colorModeState);

  useEffect(() => {
    if (page === 'RANK') {
      // TODO : rank page color mode 초기화
    } else {
      setColorMode('BOTH');
    }
    return () => {
      resetColorMode();
    };
  }, [page]);
}

export default useColorMode;
