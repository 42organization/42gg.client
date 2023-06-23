import { useEffect, useState } from 'react';
import { sleep } from 'utils/sleep';

interface ExpGuageProps {
  stat: { [key: string]: number };
}

const useExpStat = ({ stat }: ExpGuageProps) => {
  const { afterMaxExp, beforeExp, beforeLevel, beforeMaxExp, increasedExp } =
    stat;
  const [level, setLevel] = useState<number>(beforeLevel);
  const [maxExp, setMaxExp] = useState<number>(beforeMaxExp);
  const [percent, setPercent] = useState<number>(
    (beforeExp / beforeMaxExp) * 100
  );
  const [addedExp, setAddedExp] = useState<number>(0);
  const [currentExp, setCurrentExp] = useState<number>(beforeExp);
  const [celebrateEvent, setCelebrateEvent] = useState<boolean>(false);
  const MAX_LEVEL = 42;

  useEffect(() => {
    expGaugeAnimation();
  }, []);

  useEffect(() => {
    setPercent(getPercent());
    if (currentExp >= maxExp) {
      setCurrentExp(maxExp - currentExp);
      setMaxExp(afterMaxExp);
      setLevel(level + 1);
      setCelebrateEvent(true);
      setTimeout(() => {
        setPercent(0);
      }, 100);
    }
  }, [addedExp]);

  const getPercent = () => {
    return (currentExp / maxExp) * 100;
  };

  const expGaugeAnimation = () => {
    for (let i = 0; i < increasedExp; ++i) {
      sleep(i * 20).then(() => {
        setAddedExp((thisExp) => thisExp + 1);
        setCurrentExp((thisExp) => thisExp + 1);
      });
    }
  };

  return {
    percent,
    celebrateEvent,
    MAX_LEVEL,
    level,
    currentExp,
    maxExp,
    addedExp,
  };
};

export default useExpStat;
