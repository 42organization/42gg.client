import { ToggleMode } from 'types/rankTypes';
import { useRecoilState } from 'recoil';
import { toggleState } from 'utils/recoil/toggle';

const useModeToggle = () => {
  const [Mode, setMode] = useRecoilState<ToggleMode>(toggleState);

  const onToggle = (): void => {
    setMode(Mode === 'RANK' ? 'NORMAL' : 'RANK');
  };

  return { onToggle, Mode, setMode };
};

export default useModeToggle;
