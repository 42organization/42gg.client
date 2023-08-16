import { useState, useEffect, useRef } from 'react';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId?: number;
  content: string;
  intraId: string;
}

type MegaphoneList = Array<IMegaphoneContent>;

const defaultContents: MegaphoneList = [
  {
    megaphoneId: 1,
    content:
      '등록된 확성기가 없습니다. 상점에서 아이템을 구매해서 확성기를 등록해보세요!',
    intraId: '관리자',
  },
];

type MegaphoneContainerProps = {
  clickPause: () => void;
  play: string;
  children: React.ReactNode;
  count: number;
};

export const MegaphoneContainer = ({
  clickPause,
  play,
  children,
  count,
}: MegaphoneContainerProps) => {
  // 문구 수, 문구 길이에 따라 애니메이션 속도 조절하는 style 추가 필요

  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [wrapperStyle, setWrapperStyle] = useState<string>('slideNext0');
  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref.current) {
        return;
      }
      setWrapperStyle('slideNext' + selectedIndex.toString());
      if (selectedIndex === count) {
        setWrapperStyle('slideNext0');
        setSelectedIndex(0);
      } else {
        setSelectedIndex(selectedIndex + 1);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedIndex, count]);

  return (
    <div className={styles.rollingBanner} onClick={() => clickPause()}>
      <div className={`${styles.wrapper} ${styles[wrapperStyle]}`} ref={ref}>
        {/* <ul className={`${styles.megaphoneContents} ${styles[play]}`}> */}
        {children}
        {/* </ul> */}
      </div>
    </div>
  );
};

const MegaphoneItem = ({ content, intraId }: IMegaphoneContent) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.intraId}>{intraId}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

const Megaphone = () => {
  const [contents, setContents] = useState<MegaphoneList>(defaultContents);
  const [play, setPlay] = useState('running');

  // 나중에 useAxiosGet으로 변경 필요
  const getMegaphoneHandler = useMockAxiosGet<any>({
    url: `megaphones`,
    setState: (data) => {
      setContents(
        data.megaphoneList.length ? data.megaphoneList : defaultContents
      );
    },
    err: 'HJ01',
    type: 'setError',
  });

  useEffect(() => {
    getMegaphoneHandler();
  }, []);

  const clickPause = () => {
    if (play === 'pause') {
      setPlay('running');
    } else {
      setPlay('pause');
      setTimeout(() => setPlay('running'), 5000);
    }
  };

  // 흐르는 배너 형태 사용 시 확성기 전체 길이 구하는 함수
  // const getContentsLength = () => {
  //   let len = 0;
  //   for (let i = 0; i < contents.length; i++) {
  //     len += contents[i].intraId.length;
  //     len += contents[i].content.length;
  //   }
  //   return len;
  // };

  return (
    <MegaphoneContainer
      clickPause={clickPause}
      play={play}
      count={contents.length}
    >
      {/* {contents.map((content, idx) =>
        content === defaultContents[0] ? (
          <li key={idx}>{content.content}</li>
        ) : (
          <li key={idx}>
            {content.intraId} : {content.content}&nbsp;&nbsp;
          </li>
        )
      )} */}
      {contents.map((content, idx) => (
        <MegaphoneItem
          content={content.content}
          intraId={content.intraId}
          key={idx}
        />
      ))}
      {/* <MegaphoneItem content={contents[0].content} intraId={contents[0].intraId} /> */}
    </MegaphoneContainer>
  );
};

export default Megaphone;
