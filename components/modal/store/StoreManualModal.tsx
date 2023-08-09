import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import StoreManualModeRadiobox from 'components/mode/modeItems/StoreManualModeRadioBox';
import styles from 'styles/modal/match/StoreManualModal.module.scss';
import { StoreManual } from 'types/modalTypes';
import { StoreManualMode } from 'types/storeTypes';

type contentType = {
  title: React.ReactNode;
  description: string[];
};

type contentsType = Record<StoreManualMode, contentType[]>;

// TODO: 내용 확정 후 수정하기
const modalContents: contentsType = {
  COIN_POLICY: [
    {
      title: <ContentTitle title={'코인은 어떻게 얻나요?'} icon={'🔍'} />,
      description: [
        '출석하기',
        '하루 한 번 로그인 시 홈 화면에서 출석하기 버튼만 눌러도 1코인 획득!',
        '게임에 참가하기',
        '일반 게임: 승패 관계 없이 참가자 모두 2코인씩 획득',
        '랭크 게임: 오직 승자만 5코인 획득',
      ],
    },
    {
      title: <ContentTitle title={'코인은 어떻게 사용하나요?'} icon={'🔍'} />,
      description: [
        '상점 페이지 구매 탭에서 보유한 코인을 한도로 원하는 아이템 구매 가능',
      ],
    },
    {
      title: (
        <ContentTitle
          title={'코인 사용 내역은 어떻게 확인하나요?'}
          icon={'🔍'}
        />
      ),
      description: [
        '상점 페이지에 보유 코인을 누르면 코인 사용 내역 확인 가능',
      ],
    },
  ],
  STORE_POLICY: [
    {
      title: <ContentTitle title={'아이템은 어떻게 구매하나요?'} icon={'🔍'} />,
      description: [
        '상점 페이지 구매 탭에서 원하는 아이템의 구매하기 버튼 누르기',
        '아이템과 가격, 주의사항을 확인하고 확인 버튼을 누르면 구매 완료!',
      ],
    },
    {
      title: (
        <ContentTitle title={'아이템 선물은 어떻게 하나요?'} icon={'🔍'} />
      ),
      description: [
        '상점 페이지 구매 탭에서 원하는 아이템의 선물하기 버튼 누르기',
        '선물하고 싶은 유저 선택',
        '아이템과 가격, 선물 받을 유저의 아이디, 주의사항을 확인하고 보내기 버튼을 누르면 선물 완료!',
      ],
    },
    {
      title: (
        <ContentTitle
          title={'선물 받은 아이템은 어떻게 확인하나요?'}
          icon={'🔍'}
        />
      ),
      description: [
        '메인 페이지에 선물 도착 알림을 받으면 상점 페이지 보관함 탭으로 이동',
        '선물 받은 아이템엔 선물 상자가 표시됨',
        '선물 상자를 누르면 선물을 보낸 유저 확인 가능',
      ],
    },
    {
      title: <ContentTitle title={'아이템은 어떻게 사용하나요?'} icon={'🔍'} />,
      description: [
        '상점 페이지 보관함 탭에서 사용하고 싶은 아이템 선택',
        '아이템 사용 방법 및 주의사항을 꼼꼼히 읽고 사용하기 버튼을 누르면 사용 완료!',
      ],
    },
  ],
};

export default function MatchManualModal({ radioMode }: StoreManual) {
  const setModal = useSetRecoilState(modalState);
  const [manualMode, setManualMode] = useState<StoreManualMode>(radioMode);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualMode(e.target.value as StoreManualMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>WELCOME TO GG STORE</div>
      <div className={styles.matchRadioBoxWrap}>
        <StoreManualModeRadiobox
          mode={manualMode}
          onChange={modeChangeHandler}
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
      <button
        className={`${styles['modalButton']}`}
        onClick={() => setModal({ modalName: null })}
      >
        확 인
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
