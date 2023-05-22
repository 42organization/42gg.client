import { useState } from 'react';

const useModeToggle = (toggleMode: 'normal' | 'rank') => {
  const [Mode, setMode] = useState(toggleMode);

  const onToggle = (): void => {
    setMode(Mode === 'rank' ? 'normal' : 'rank');
  };

  return { onToggle, Mode };
};

export default useModeToggle;
