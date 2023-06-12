import { useState } from 'react';
import { ToggleMode } from 'types/rankTypes';

const useModeToggle = (toggleMode: ToggleMode) => {
  const [Mode, setMode] = useState<ToggleMode>(toggleMode);

  const onToggle = (): void => {
    setMode(Mode === 'rank' ? 'normal' : 'rank');
  };

  return { onToggle, Mode };
};

export default useModeToggle;
