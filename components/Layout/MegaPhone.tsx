import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Item } from 'types/itemTypes';
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
  megaphoneId: 0,
  content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
  intraId: '관리자',
};

export const MegaphoneContainer = ({
  children,
  count,
}: MegaphoneContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useInterval(() => {
    const nextIndex = (selectedIndex + 1) % count;
    setSelectedIndex(nextIndex);
  }, 4000);

  return (
    <div className={styles.rollingBanner}>
      <div
        className={styles.wrapper}
        style={{
          transition: 'all 1s ease-in-out',
          transform: `translateY(${selectedIndex * -100}%)`,
        }}
        ref={ref}
      >
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
  const [contents, setContents] = useState<MegaphoneList>([]);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [megaphoneData, setMegaphoneData] = useState<MegaphoneList>([]);
  const presentPath = useRouter().asPath;

  const getItemListHandler = useAxiosGet<any>({
    url: `/pingpong/items/store`,
    setState: (data) => {
      setItemList(data.itemList);
    },
    err: 'HB01',
    type: 'setError',
  });

  const getMegaphoneHandler = useAxiosGet<any>({
    url: `/pingpong/megaphones`,
    setState: setContents,
    err: 'HJ01',
    type: 'setError',
  });

  useEffect(() => {
    getMegaphoneHandler();
  }, [presentPath]);

  useEffect(() => {
    if (contents.length === 0) getItemListHandler();
  }, [contents]);

  useEffect(() => {
    if (contents.length > 0) setMegaphoneData(contents);
    else {
      setMegaphoneData([
        adminContent,
        ...itemList.reduce((acc: MegaphoneList, cur) => {
          acc.push({
            megaphoneId: cur.itemId,
            content: cur.itemName + ' : ' + cur.mainContent,
            intraId: '절찬 판매 중!',
          });
          return acc;
        }, []),
      ]);
    }
  }, [contents, itemList]);

  return (
    <div className={styles.rollingBanner}>
      <div className={styles.wrapper}>
        <Virtuoso
          totalCount={megaphoneData.length}
          itemContent={(index) => (
            <MegaphoneItem
              content={megaphoneData[index].content}
              intraId={megaphoneData[index].intraId}
            />
          )}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );

  // return (
  //   <MegaphoneContainer count={megaphoneData.length}>
  //     {megaphoneData.map((content, idx) => (
  //       <MegaphoneItem
  //         content={content.content}
  //         intraId={content.intraId}
  //         key={idx}
  //       />
  //     ))}
  //   </MegaphoneContainer>
  // );

  // return contents.length > 0 ? (
  //   <MegaphoneContainer count={contents.length}>
  //     {contents.map((content, idx) => (
  //       <MegaphoneItem
  //         content={content.content}
  //         intraId={content.intraId}
  //         key={idx}
  //       />
  //     ))}
  //   </MegaphoneContainer>
  // ) : (
  //   <MegaphoneContainer count={itemList.length + 1}>
  //     <MegaphoneItem
  //       content={adminContent.content}
  //       intraId={adminContent.intraId}
  //     />
  //     {itemList.map((item, idx) => (
  //       <MegaphoneItem
  //         content={item.itemName + ' : ' + item.mainContent}
  //         intraId={'절찬 판매 중!'}
  //         key={idx}
  //       />
  //     ))}
  //   </MegaphoneContainer>
  // );
};

export default Megaphone;
