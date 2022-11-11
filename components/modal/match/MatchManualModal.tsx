import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Manual } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import { seasonListState } from 'utils/recoil/seasons';
import ModeToggle from 'components/mode/modeItems/ModeToggle';
import styles from 'styles/modal/MatchManualModal.module.scss';

export default function MatchManualModal({ toggleMode }: Manual) {
  const setModal = useSetRecoilState(modalState);
  const { seasonMode } = useRecoilValue(seasonListState);
  const [manualMode, setManualMode] = useState(toggleMode);

  const onReturn = () => {
    setModal({ modalName: null });
  };

  const onToggle = () => {
    setManualMode(manualMode === 'rank' ? 'normal' : 'rank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Please!!</div>
      {seasonMode === 'both' && (
        <div className={styles.toggleContainer}>
          <ModeToggle
            checked={manualMode === 'rank'}
            onToggle={onToggle}
            id={'manualToggle'}
            text={manualMode === 'rank' ? '랭크' : '일반'}
          />
        </div>
      )}
      <ul className={styles.ruleList}>
        {manualSelect(manualMode).map(
          (item: { title: string; description: string[] }, i) => (
            <li key={i}>
              {item.title}
              <ul className={styles.ruleDetail}>
                {item.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
      <div className={styles.buttons}>
        <div className={styles.positive}>
          <input onClick={onReturn} type='button' value={'확 인'} />
        </div>
      </div>
    </div>
  );
}

const modalContentsNormal: { title: string; description: string[] }[] = [
  {
    title: '🔍 매칭',
    description: [
      '등록한 경기가 끝나야만 다음 경기 등록 가능',
      '경기 시작 5분 전 상대 팀 공개 및 경기 취소 불가',
      '매칭 알림은 이메일로 전달',
      '경기가 매칭된 상태에서 취소 시, 1분간 경기 등록 불가',
      '상대방이 경기를 취소하면 나의 경기는 매칭 대기 상태로 전환',
    ],
  },
  {
    title: '📖 일반 경기 규칙',
    description: ['자유 규칙 !'],
  },
  {
    title: '✅ 경기 결과',
    description: [
      '일반 게임 진행 시 점수 입력 없음',
      '게임 시작 후 10분이 경과해야 게임 종료 가능',
    ],
  },
  {
    title: '🚨 경기 시 주의사항',
    description: [`노쇼는 건의사항 기능 이용해서 신고`],
  },
];

const modalContentsRank: { title: string; description: string[] }[] = [
  {
    title: '🔍 매칭',
    description: [
      '등록한 경기가 끝나야만 다음 경기 등록 가능',
      '경기 시작 5분 전 상대 팀 공개 및 경기 취소 불가',
      '매칭 알림은 이메일로 전달',
      '경기가 매칭된 상태에서 취소 시, 1분간 경기 등록 불가',
      '상대방이 경기를 취소하면 나의 경기는 매칭 대기 상태로 전환',
      '일정 점수 이상 차이 나는 상대와 랭크 경기 불가',
    ],
  },
  {
    title: '📖 랭크 경기 규칙',
    description: [
      '11점 3판 2선승제',
      '경기는 10분 동안 진행',
      '점수가 10:10 인 경우 듀스',
      '듀스인 경우, 2점 차가 나면 경기 종료',
      '탁구채를 잡지 않은 손으로 탁구대를 짚으면 실점',
      '탁구대 및 네트가 아닌 곳에 공이 맞을 시 실점',
    ],
  },
  {
    title: '🏓 서브 규칙',
    description: [
      '첫 세트만 서브 게임 진행',
      '서브 게임 승자부터 세트별 교대로 서브',
      '서브는 2점마다 교대하며, 듀스일 때는 1점마다 교대',
      '서브 시작 시 상대방에게 신호 (e.g. 서브하겠습니다.)',
      '서브 시 공이 네트에 맞고 넘어가면 다시 서브',
    ],
  },
  {
    title: '✅ 경기 결과',
    description: [
      '경기 종료 후 그 자리에서 세트 점수 입력',
      '종료시간에 다음 경기가 있을 시 현재 스코어가 높은 선수가 승리',
      '다음 경기가 없을 시 계속 진행',
    ],
  },
  {
    title: '🚨 노쇼',
    description: [
      `매치가 시작 되었으나 상대방이 나오지 않는다면\n3분이 지날 때 마다 세트 점수 1점씩 획득`,
      '6분이 지났을 때도 나오지 않았다면 세트 점수 2:0 승리 처리',
    ],
  },
];

const manualSelect = (modalToggleMode: MatchMode) =>
  modalToggleMode === 'rank' ? modalContentsRank : modalContentsNormal;
