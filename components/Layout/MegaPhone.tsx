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

const adminContent: IMegaphoneContent = {
  megaphoneId: 1,
  content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
  intraId: '관리자',
};

const megaphoneContent: IMegaphoneContent = {
  megaphoneId: 2,
  content: '오늘 하루 42GG는 내가 접수한다 📢😎',
  intraId: '확성기',
};

const profileContent: IMegaphoneContent = {
  megaphoneId: 3,
  content: '얼굴 체인지',
  intraId: '이미지 변경권',
};

const edgeContent: IMegaphoneContent = {
  megaphoneId: 4,
  content: '난 "Edge"로 말해.. -sishin 😝',
  intraId: 'Edge 뽑기',
};

const backgroundContent: IMegaphoneContent = {
  megaphoneId: 5,
  content: '난 "Background"부터가 달라 - klew 😝',
  intraId: '배경 뽑기',
};

const idContent: IMegaphoneContent = {
  megaphoneId: 6,
  content: '남들과는 다르게! ID 색깔을 바꿔보세요!',
  intraId: 'ID 색깔 변경권',
};

const defaultContents: MegaphoneList = [
  adminContent,
  megaphoneContent,
  profileContent,
  edgeContent,
  backgroundContent,
  idContent,
];

// 메가폰 10개 넘어도 잘 작동하는지 테스트하는 테스트용 temp 입니다.
const temp = defaultContents;
for (let i = 0; i < 4; i++) {
  temp.push(...defaultContents);
}

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
  }, 1000);

  return (
    <div className={styles.rollingBanner}>
      <div className={`${styles.wrapper} ${styles[wrapperStyle]}`} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export const MegaphoneItem = ({ content, intraId }: IMegaphoneContent) => {
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
      // megaphone 아이템이 여러개 들어와도 잘 작동하는지 테스트용 임시 temp입니다.
      // 위에서 temp 길이를 조정할 수 있습니다.
      // setContents(data.length > 0 ? data : defaultContents);
      setContents(data.length > 0 ? data : temp);
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
