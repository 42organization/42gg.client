import { useState, useEffect, useRef } from 'react';
import useAxiosGet from 'hooks/useAxiosGet';
import useInterval from 'hooks/useInterval';
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
    content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
    intraId: '관리자',
  },
  {
    megaphoneId: 2,
    content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
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

  useInterval(() => {
    const nextIndex = (selectedIndex + 1) % count;
    setWrapperStyle('slideNext' + nextIndex.toString());
    setSelectedIndex(nextIndex);
  }, 4500);

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

  const getMegaphoneHandler = useAxiosGet<any>({
    url: `/pingpong/megaphones`,
    setState: (data) => {
      setContents(data.length > 0 ? data : defaultContents);
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
