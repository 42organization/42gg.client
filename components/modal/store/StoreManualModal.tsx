import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { StoreManual } from 'types/modalTypes';
import { StoreManualMode } from 'types/storeTypes';
import { modalState } from 'utils/recoil/modal';
import StoreManualModeRadiobox from 'components/mode/modeItems/StoreManualModeRadioBox';
import styles from 'styles/modal/store/StoreManualModal.module.scss';

type descriptionType = {
  tag: string;
  content: string[];
};

type contentType = {
  title: React.ReactNode;
  description: descriptionType[];
};

type contentsType = Record<StoreManualMode, contentType[]>;

// TODO: 내용 확정 후 수정하기
const modalContents: contentsType = {
  COIN_POLICY: [
    {
      title: <ContentTitle title={'코인은 어떻게 얻나요?'} icon={'🔍'} />,
      description: [
        {
          tag: '출석하기',
          content: ['하루 한 번 로그인 시 출석하기 버튼만 눌러도 1코인 획득'],
        },
        {
          tag: '게임에 참가하기',
          content: [
            '일반 게임: 승패 관계 없이 참가자 모두 2코인씩 획득',
            '랭크 게임: 오직 승자만 5코인 획득',
          ],
        },
      ],
    },
    {
      title: <ContentTitle title={'코인은 어떻게 사용하나요?'} icon={'🔍'} />,
      description: [
        {
          tag: '',
          content: [
            '상점 페이지 구매 탭에서 판매 중인 아이템을 살펴보세요',
            '보유한 코인으로 원하는 아이템 구매가 가능합니다',
          ],
        },
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
        {
          tag: '',
          content: [
            '상점 페이지에서 코인을 눌러보세요',
            '코인 획득 및 사용 내역을 확인할 수 있습니다',
          ],
        },
      ],
    },
  ],
  STORE_POLICY: [
    {
      title: <ContentTitle title={'아이템은 어떻게 구매하나요?'} icon={'🔍'} />,
      description: [
        {
          tag: '',
          content: [
            '구매 탭에서 원하는 아이템의 구매하기 버튼 누르기',
            '아이템과 가격, 주의사항을 확인하고 확인 버튼을 누르면 구매 완료!',
          ],
        },
      ],
    },
    {
      title: (
        <ContentTitle title={'아이템 선물은 어떻게 하나요?'} icon={'🔍'} />
      ),
      description: [
        {
          tag: '',
          content: [
            '구매 탭에서 원하는 아이템의 선물하기 버튼 누르기',
            '선물하고 싶은 유저 선택',
            '아이템과 가격, 선물 받을 유저의 아이디, 주의사항을 확인하고 보내기 버튼을 누르면 선물 완료!',
          ],
        },
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
        {
          tag: '',
          content: [
            '알림 탭에서 선물 도착 알림을 받으면 상점 페이지 보관함 탭으로 이동',
            '새롭게 추가된 아이템의 선물 상자 표시를 꾹 누르면 선물을 보낸 유저 확인 가능',
          ],
        },
      ],
    },
    {
      title: <ContentTitle title={'아이템은 어떻게 사용하나요?'} icon={'🔍'} />,
      description: [
        {
          tag: '',
          content: [
            '상점 페이지 보관함 탭에서 사용하고 싶은 아이템 선택',
            '아이템 사용 방법 및 주의사항을 꼼꼼히 읽고 사용하기 버튼을 누르면 사용 완료!',
          ],
        },
      ],
    },
  ],
};

export default function StoreManualModal({ radioMode }: StoreManual) {
  const setModal = useSetRecoilState(modalState);
  const [manualMode, setManualMode] = useState<StoreManualMode>(radioMode);

  const modeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualMode(e.target.value as StoreManualMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>GG STORE</div>
      <div className={styles.storeRadioBoxWrap}>
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
              description: descriptionType[];
            },
            index
          ) => (
            <li key={index}>
              {item.title}
              <ul className={styles.ruleDetail}>
                {item.description.map((rule, idx) =>
                  rule.tag !== '' ? (
                    <li key={idx}>
                      {rule.tag}
                      <ul className={styles.ruleContent}>
                        {rule.content.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    rule.content.map((e, idx) => <li key={idx}>{e}</li>)
                  )
                )}
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
