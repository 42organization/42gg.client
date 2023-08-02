import { useState, useEffect } from 'react';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/Layout/Megaphone.module.scss';

interface IMegaphoneContent {
  megaphoneId: number;
  content: string;
  intraId: string;
}

type MegaphoneList = Array<IMegaphoneContent>;

const defaultContents: MegaphoneList = [
  {
    megaphoneId: 1,
    content: '문구를 입력해주세요',
    intraId: 'admin',
  },
];

const Megaphone = () => {
  const [contents, setContents] = useState<MegaphoneList>(defaultContents);
  const [play, setPlay] = useState('running');

  // 나중에 useAxiosGet으로 변경 필요
  const getMegaphoneHandler = useMockAxiosGet<any>({
    url: `pingpong/megaphones`,
    setState: (data) => {
      setContents(data.megaphoneList);
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

  const pauseStyle: { [key: string]: string } = {
    pause: styles.pause,
    running: styles.running,
  };

  return (
    <div className={styles.rollingBanner} onClick={() => clickPause()}>
      <div className={styles.wrapper}>
        <ul className={`${styles.megaphoneContents} ${pauseStyle[play]}`}>
          {contents.map((content, idx) => (
            <li key={idx}>
              {' '}
              {idx} {content.intraId} : {content.content}&nbsp;&nbsp;
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Megaphone;
