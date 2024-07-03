import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/modal/party/PartyManualModal.module.scss';

type contentType = {
  title: React.ReactNode;
  description: string[];
};

// TODO : 전체 타입에 대한 설명 추가해야 합니다.
const modalContents: contentType[] = [
  {
    title: <ContentTitle title={'참가 및 시작'} icon={'🔍'} />,
    description: [
      '하고 싶은 게임을 정해 방을 만들거나 참가합니다.',
      '방장이 최소인원이 넘을 경우 시작할 수 있습니다.',
      '인원이 전부 모인 경우 자동으로 시작합니다.',
      '방이 시작되면 슬랙 DM으로 초대해드립니다.',
      '방이 시작되면 참가자에게만 익명이 해제되며 댓글을 달 수 없게 됩니다.',
    ],
  },
  {
    title: <ContentTitle title={'주의 사항'} icon={'⚠'} />,
    description: [
      '예약 서비스가 아니므로 콘솔게임이나 보드게임이 사용중일 경우 다른 게임을 하거나 시간을 조정해야합니다.',
    ],
  },
  {
    title: <ContentTitle title={'게임 추가 건의'} icon={'✋'} />,
    description: ['추가 하고 싶은 게임이 있다면 건의하기로 추천해주세요.'],
  },
  {
    title: <ContentTitle title={'신고'} icon={'🚨'} />,
    description: [
      '말 없이 노쇼하거나 여러번의 신고 누적 시 패널티 상태가 됩니다.',
      '억울하게 패널티 상태가 되었을 경우 건의하기로 건의 부탁드립니다.',
    ],
  },
];

export default function PartyManudalModal() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div className={styles.container}>
      <div className={styles.title}>파티 모집</div>
      <ul className={styles.ruleList}>
        {modalContents.map(
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
      <button
        onClick={() => setModal({ modalName: null })}
        className={styles.closeButton}
      >
        확인
      </button>
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
