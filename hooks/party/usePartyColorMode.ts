import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { PartyColors } from 'types/partyTypes';
import { colorModeState } from 'utils/recoil/colorMode';

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
