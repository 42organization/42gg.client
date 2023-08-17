import { useState, useEffect, useRef } from 'react';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import styles from 'styles/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId?: number;
  content: string;
  intraId: string;
}

type MegaphoneList = Array<IMegaphoneContent>;

type MegaphoneContainerProps = {
  children: React.ReactNode;
  count: number;
};

const defaultContents: MegaphoneList = [
  {
    megaphoneId: 1,
    content:
      '등록된 확성기가 없습니다. 상점에서 아이템을 구매해서 확성기를 등록해보세요!',
    intraId: '관리자',
  },
  {
    megaphoneId: 2,
    content:
      '등록된 확성기가 없습니다. 상점에서 아이템을 구매해서 확성기를 등록해보세요!',
    intraId: '관리자',
  },
];

export const MegaphoneContainer = ({
  children,
  count,
}: MegaphoneContainerProps) => {
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
    <div className={styles.rollingBanner}>
      <div className={`${styles.wrapper} ${styles[wrapperStyle]}`} ref={ref}>
        {children}
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

  return (
    <MegaphoneContainer count={contents.length}>
      {contents.map((content, idx) => (
        <MegaphoneItem
          content={content.content}
          intraId={content.intraId}
          key={idx}
        />
      ))}
    </MegaphoneContainer>
  );
};

export default Megaphone;
