import { useState } from 'react';

const useModeToggle = (toggleMode: 'NORMAL' | 'RANK' | 'BOTH') => {
  const [Mode, setMode] = useState(toggleMode);

  const onToggle = (): void => {
    setMode(Mode === 'RANK' ? 'NORMAL' : 'RANK');
  };

  return { onToggle, Mode };
};

export default useModeToggle;
