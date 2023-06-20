import { useState } from 'react';
import { MatchMode } from 'types/mainType';
import MatchBoard from 'components/match/MatchBoard';
import MatchModeWrap from 'components/mode/modeWraps/MatchModeWrap';
import useGetReloadMatchHandler from 'hooks/match/useGetReloadMatchHandler';
import useColorMode from 'hooks/useColorMode';
import { Match } from 'types/matchTypes';
import { stringToHourMin } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/modalTypes';
import styles from 'styles/match/match.module.scss';

export default function MatchPage() {
  const content = {
    NORMAL: { style: styles.normal },
    RANK: { style: '' },
    BOTH: { style: '' },
  };

  const [radioMode, setRadioMode] = useState<MatchMode>('BOTH');
  const [match, setMatch] = useState<Match | null>(null);
  const [spinReloadButton, setSpinReloadButton] = useState<boolean>(false);
  const setModal = useSetRecoilState<Modal>(modalState);

  const reloadMatchHandler = useGetReloadMatchHandler({
    setMatch,
    setSpinReloadButton,
    radioMode,
  });

  useColorMode('MATCH');

  const openManual = () => {
    setModal({ modalName: 'MATCH-MANUAL', manual: { radioMode: radioMode } });
  };

  if (!match) return null;

  const { matchBoards } = match;

  const getFirstOpenSlot = () => {
    for (let i = 0; i < matchBoards.length; i++) {
      const matchSlot = matchBoards[i];
      if (matchSlot[0].status === 'open') {
        return stringToHourMin(matchSlot[0].startTime).nHour;
      }
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${content[radioMode].style}`}>Match</h1>
      <div className={styles.buttonWrap}>
        {getFirstOpenSlot() === null && (
          <div className={styles.notice}>❌ 열린 슬롯이 없습니다 😵‍💫 ❌</div>
        )}
        <button className={styles.manual} onClick={openManual}>
          매뉴얼
        </button>
        <button
          className={`${styles.reload} ${spinReloadButton && styles.spin}`}
          onClick={reloadMatchHandler}
        >
          &#8635;
        </button>
      </div>
      <MatchModeWrap
        radioMode={radioMode}
        setRadioMode={setRadioMode}
        match={match}
      >
        <MatchBoard radioMode={radioMode} match={match} />
      </MatchModeWrap>
    </div>
  );
}
