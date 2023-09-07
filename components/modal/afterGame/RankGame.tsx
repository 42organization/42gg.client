import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AfterGame, TeamScore } from 'types/scoreTypes';
import { isAxiosError } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { reloadMatchState } from 'utils/recoil/match';
import { Button, Buttons } from 'components/modal/afterGame/Buttons';
import Guide from 'components/modal/afterGame/Guide';
import { MatchTeams } from 'components/modal/afterGame/MatchTeams';
import Score from 'components/modal/afterGame/Score';
import {
  ModalButton,
  ModalButtonContainer,
} from 'components/modal/ModalButton';
import useRankGame from 'hooks/modal/aftergame/useRankGame';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface RankGameProps {
  currentGame: AfterGame;
  // FIXME - 동작 확인되면 주석 지울 것
  // onSubmit: (gameResult: TeamScore) => void;
  onSubmit: (gameResult: TeamScore) => Promise<void>;
  openStatChange: () => void;
}

const rankResponse: Record<'SUCCESS' | 'DUPLICATED', string> = {
  SUCCESS: '결과 입력이 완료되었습니다.',
  DUPLICATED: '상대가 이미 점수를 입력했습니다.',
};

const errorCode = ['GM202', 'GM204'] as const;

type errorCodeType = (typeof errorCode)[number];

type errorResponse = {
  status: number;
  message: string;
  code: errorCodeType;
};

export default function RankGame({
  currentGame,
  onSubmit,
  openStatChange,
}: RankGameProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const setError = useSetRecoilState(errorState);

  const {
    onCheck,
    matchTeamsInfo,
    result,
    isScoreExist,
    inputScoreHandler,
    enterHandler,
    resetHandler,
  } = useRankGame({ currentGame, onSubmit });

  const submitHandler = () => {
    setIsLoading(true);
    onSubmit(result)
      .then(() => {
        setIsLoading(false);
        alert(rankResponse.SUCCESS);
      })
      .catch((e: unknown) => {
        setIsLoading(false);
        if (isAxiosError<errorResponse>(e) && e.response) {
          const { code } = e.response.data;
          if (errorCode.includes(code)) {
            alert(rankResponse.DUPLICATED);
            setReloadMatch(true); // 현재 유저 event 상태 재확인
          } else setError('JH04');
        } else setError('JH04');
      })
      .finally(() => openStatChange());
  };

  return (
    <div className={styles.container}>
      {isScoreExist ? (
        <Guide condition={onCheck} modalMode='CONFIRM' />
      ) : (
        <Guide condition={onCheck} modalMode='RANK' />
      )}
      <div className={styles.resultContainer}>
        <MatchTeams matchTeams={matchTeamsInfo} />
        <Score
          onCheck={onCheck}
          result={result}
          onChange={inputScoreHandler}
          onEnter={enterHandler}
        />
      </div>
      {isScoreExist ? (
        // FIXME - 동작 확인되면 주석 지울 것
        // <div className={styles.buttons}>
        //   <Button
        //     style={styles.positive}
        //     value='게임종료'
        //     onClick={() => onSubmit(result)}
        //   />
        // </div>
        <ModalButtonContainer>
          <ModalButton
            style='positive'
            value='게임 종료'
            onClick={openStatChange}
            isLoading={false}
          />
        </ModalButtonContainer>
      ) : (
        <Buttons
          onCheck={onCheck}
          onEnter={enterHandler}
          onReset={resetHandler}
          onSubmit={submitHandler}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
