import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AfterGame } from 'types/scoreTypes';
import { errorState } from 'utils/recoil/error';
import { Button } from 'components/modal/afterGame/Buttons';
import Guide from 'components/modal/afterGame/Guide';
import { MatchTeams } from 'components/modal/afterGame/MatchTeams';
import { ModalButton } from 'components/modal/ModalButton';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface NormalGameProps {
  currentGame: AfterGame;
  onSubmit: () => Promise<void>;
  openStatChange: () => void;
}

export default function NormalGame({
  currentGame,
  onSubmit,
  openStatChange,
}: NormalGameProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setError = useSetRecoilState(errorState);
  const { matchTeamsInfo } = currentGame;

  const submitHandler = () => {
    setIsLoading(true);
    onSubmit()
      .then(() => {
        setIsLoading(false);
        openStatChange();
      })
      .catch(() => {
        setIsLoading(false);
        setError('KP04');
      });
  };

  return (
    <div className={styles.container}>
      <Guide condition={true} modalMode='NORMAL' />
      <div className={`${styles.resultContainer} ${styles.normal}`}>
        <MatchTeams matchTeams={matchTeamsInfo} />
      </div>
      {/* FIXME - 동작 확인되면 주석 지울 것 */}
      {/* <div className={styles.buttons}>
        <Button style={styles.positive} value='게임 종료' onClick={onSubmit} />
      </div> */}
      <ModalButton
        style='positive'
        value='게임 종료'
        onClick={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}
