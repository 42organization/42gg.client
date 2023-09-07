import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Manual } from 'types/modalTypes';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import ModeRadiobox from 'components/mode/modeItems/ModeRadiobox';
import styles from 'styles/modal/match/MatchManualModal.module.scss';

type contentType = {
  title: React.ReactNode;
  description: string[];
};

type contentsType = Record<MatchMode, contentType[]>;

// TODO : 전체 타입에 대한 설명 추가해야 합니다.
const modalContents: contentsType = {
  BOTH: [
    {
      title: <ContentTitle title={'빠른매칭'} icon={'🔍'} />,
      description: [
        '빠른매칭 등록시 일반 또는 랭크 중 먼저 매칭되는 경기 진행',
        '상대방 매칭시 해당 모드에 🙋 표시',
        '3경기까지 등록 가능',
        '매칭 성공시 등록된 다른 경기들은 취소',
        '상대 팀이 공개되면 경기 취소 불가',
        '매칭 알림은 이메일로 전달',
        '경기가 매칭된 상태에서 취소 시, 30분간 경기 등록 불가',
        '상대방이 경기를 취소하면 나의 경기는 매칭 대기 상태로 전환',
      ],
    },
    {
      title: <ContentTitle title={'랭크 경기 규칙'} icon={'📖'} />,
      description: [
        '11점 3판 2선승제',
        '경기시간은 슬롯에 표기',
        '점수가 10:10 인 경우 듀스',
        '듀스인 경우, 2점 차가 나면 경기 종료',
        '탁구채를 잡지 않은 손으로 탁구대를 짚으면 실점',
        '탁구대 및 네트가 아닌 곳에 공이 맞을 시 실점',
        '자세한 규칙은 랭크 규칙을 참고해주세요',
      ],
    },
    {
      title: <ContentTitle title={'일반 경기 규칙'} icon={'📖'} />,
      description: ['자유 규칙 !'],
    },
    {
      title: <ContentTitle title={'경기 결과'} icon={'✅'} />,
      description: ['일반 게임 진행 시 점수 입력 없음'],
    },
    {
      title: <ContentTitle title={'노쇼'} icon={'🚨'} />,
      description: [`노쇼는 건의사항 기능 이용해서 신고`],
    },
  ],
  NORMAL: [
    {
      title: <ContentTitle title={'매칭'} icon={'🔍'} />,
      description: [
        '3경기까지 등록 가능',
        '매칭 성공시 등록된 다른 경기들은 취소',
        '상대 팀이 공개되면 경기 취소 불가',
        '매칭 알림은 이메일로 전달',
        '경기가 매칭된 상태에서 취소 시, 30분간 경기 등록 불가',
        '상대방이 경기를 취소하면 나의 경기는 매칭 대기 상태로 전환',
      ],
    },
    {
      title: <ContentTitle title={'일반 경기 규칙'} icon={'📖'} />,
      description: ['자유 규칙 !'],
    },
    {
      title: <ContentTitle title={'경기 결과'} icon={'✅'} />,
      description: ['일반 게임 진행 시 점수 입력 없음'],
    },
    {
      title: <ContentTitle title={'노쇼'} icon={'🚨'} />,
      description: [`노쇼는 건의사항 기능 이용해서 신고`],
    },
  ],
  RANK: [
    {
      title: <ContentTitle title={'매칭'} icon={'🔍'} />,
      description: [
        '3경기까지 등록 가능',
        '매칭 성공시 등록된 다른 경기들은 취소',
        '상대 팀이 공개되면 경기 취소 불가',
        '매칭 알림은 이메일로 전달',
        '경기가 매칭된 상태에서 취소 시, 30분간 경기 등록 불가',
        '상대방이 경기를 취소하면 나의 경기는 매칭 대기 상태로 전환',
        '일정 점수 이상 차이 나는 상대와 랭크 경기 불가',
      ],
    },
    {
      title: <ContentTitle title={'랭크 경기 규칙'} icon={'📖'} />,
      description: [
        '11점 3판 2선승제',
        '경기시간은 슬롯에 표기',
        '점수가 10:10 인 경우 듀스',
        '듀스인 경우, 2점 차가 나면 경기 종료',
        '탁구채를 잡지 않은 손으로 탁구대를 짚으면 실점',
        '탁구대 및 네트가 아닌 곳에 공이 맞을 시 실점',
      ],
    },
    {
      title: <ContentTitle title={'서브 규칙'} icon={'🚨'} />,
      description: [
        '첫 세트만 서브 게임 진행',
        '서브 게임 승자부터 세트별 교대로 서브',
        '서브는 2점마다 교대하며, 듀스일 때는 1점마다 교대',
        '서브 시작 시 상대방에게 신호 (e.g. 서브하겠습니다.)',
        '서브 시 공이 네트에 맞고 넘어가면 다시 서브',
      ],
    },
    {
      title: <ContentTitle title={'경기 결과'} icon={'✅'} />,
      description: [
        '경기 종료 후 그 자리에서 세트 점수 입력',
        '종료시간에 다음 경기가 있을 시 현재 스코어가 높은 선수가 승리',
        '다음 경기가 없을 시 계속 진행 가능',
      ],
    },
    {
      title: <ContentTitle title={'노쇼'} icon={'🚨'} />,
      description: [
        `매치가 시작 되었으나 상대방이 나오지 않는다면 3분이 지날 때 마다 세트 점수 1점씩 획득`,
        '6분이 지났을 때도 나오지 않았다면 세트 점수 2:0 승리 처리',
      ],
    },
  ],
};

export default function MatchManualModal({ radioMode }: Manual) {
  const setModal = useSetRecoilState(modalState);
  const [manualMode, setManualMode] = useState<MatchMode>(radioMode);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualMode(e.target.value as MatchMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Important</div>
      <div className={styles.matchRadioBoxWrap}>
        <ModeRadiobox
          mode={manualMode}
          page='MANUAL'
          onChange={modeChangeHandler}
          zIndexList={false}
        />
      </div>
      <ul className={styles.ruleList}>
        {modalContents[manualMode].map(
          (
            item: {
              title: React.ReactNode;
              description: string[];
            },
            index
          ) => (
            <li key={index}>
              {item.title}
              <ul className={styles.ruleDetail}>
                {item.description.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
      <ModalButtonContainer>
        <ModalButton
          onClick={() => setModal({ modalName: null })}
          style='positive'
          value='확인'
        />
      </ModalButtonContainer>
    </div>
  );
}

type contentTitleProps = {
  title: string;
  icon?: React.ReactNode | string;
};

function ContentTitle({ title, icon }: contentTitleProps) {
  icon = typeof icon === 'string' ? <span>{icon}</span> : icon;
  return (
    <div
      className={`${styles.ruleTitle} 
      ${styles[icon ? 'withIcon' : 'withoutIcon']}`}
    >
      {icon ? icon : null}
      <span>{title}</span>
    </div>
  );
}
