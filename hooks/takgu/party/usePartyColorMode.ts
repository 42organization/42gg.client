import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { PartyColors } from 'types/takgu/partyTypes';
import { colorModeState } from 'utils/takgu/recoil/colorMode';

export default function usePartyColorMode(color: PartyColors) {
  const setColorMode = useSetRecoilState(colorModeState);
  const resetColorMode = useResetRecoilState(colorModeState);

  useEffect(() => {
    setColorMode(color);
    return () => {
      resetColorMode();
    };
  }, []);
}
