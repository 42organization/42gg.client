import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Item } from 'types/takgu/itemTypes';
import useAxiosGet from 'hooks/useAxiosGet';
import useInterval from 'hooks/useInterval';
import styles from 'styles/takgu/Layout/MegaPhone.module.scss';

interface IMegaphoneContent {
  megaphoneId?: number;
  content: string;
  intraId: string;
}

type MegaphoneList = Array<IMegaphoneContent>;

const adminContent: IMegaphoneContent = {
  megaphoneId: 0,
  content: '상점에서 아이템을 구매해서 확성기를 등록해보세요!(30자 제한)',
  intraId: '관리자',
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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const virtuoso = useRef<VirtuosoHandle>(null);
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
    if (contents.length > 0) setMegaphoneData([...contents, adminContent]);
    else {
      setMegaphoneData([
        ...itemList.map(
          (item): IMegaphoneContent => ({
            megaphoneId: item.itemId,
            content: item.itemName + ' : ' + item.mainContent,
            intraId: '절찬 판매 중!',
          })
        ),
        adminContent,
      ]);
    }
  }, [contents, itemList]);

  useInterval(() => {
    if (!megaphoneData) return;
    const nextIndex = (selectedIndex + 1) % megaphoneData.length;
    setSelectedIndex(nextIndex);
    if (virtuoso.current !== null)
      virtuoso.current.scrollToIndex({
        index: nextIndex,
        align: 'start',
        behavior: 'smooth',
      });
  }, 4000);

  return (
    <div className={styles.rollingBanner}>
      <div className={styles.wrapper}>
        {!!megaphoneData && megaphoneData.length > 0 && (
          <Virtuoso
            totalCount={megaphoneData.length}
            data={megaphoneData}
            ref={virtuoso}
            itemContent={(_, data) => <MegaphoneItem {...data} />}
            style={{ height: '100%' }}
          />
        )}
      </div>
    </div>
  );
};

export default Megaphone;
