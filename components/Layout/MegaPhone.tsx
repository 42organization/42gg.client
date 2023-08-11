import { useState, useEffect } from 'react';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId: number;
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
};

export const MegaphoneContainer = ({
  clickPause,
  play,
  children,
}: MegaphoneContainerProps) => {
  // 문구 수, 문구 길이에 따라 애니메이션 속도 조절하는 style 추가 필요

  return (
    <div className={styles.rollingBanner} onClick={() => clickPause()}>
      <div className={styles.wrapper}>
        <ul className={`${styles.megaphoneContents} ${styles[play]}`}>
          {children}
        </ul>
      </div>
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

  // 문구 수, 문구 길이에 따라 애니메이션 속도 조절하는 style 추가 필요

  // const pauseStyle: { [key: string]: string } = {
  //   pause: styles.pause,
  //   running: styles.running,
  // };

  return (
    // <div className={styles.rollingBanner} onClick={() => clickPause()}>
    //   <div className={styles.wrapper}>
    //     <ul className={`${styles.megaphoneContents} ${pauseStyle[play]}`}>
    <MegaphoneContainer clickPause={clickPause} play={play}>
      {contents.map((content, idx) =>
        content === defaultContents[0] ? (
          <li key={idx}>{content.content}</li>
        ) : (
          <li key={idx}>
            {content.intraId} : {content.content}&nbsp;&nbsp;
          </li>
        )
      )}
    </MegaphoneContainer>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Megaphone;
