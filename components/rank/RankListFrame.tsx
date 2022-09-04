import { useRouter } from 'next/router';
import PageNation from 'components/Pagination';
import styles from 'styles/rank/RankList.module.scss';

interface PageInfo {
  currentPage?: number;
  totalPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
interface RankListFrameProps {
  children: React.ReactNode;
  pageInfo: PageInfo;
  isRankMode: boolean;
}

export default function RankListFrame({
  children,
  pageInfo,
  isRankMode,
}: RankListFrameProps) {
  const router = useRouter();
  const divisionList = isRankMode
    ? ['순위', 'intraId', '상태메시지', '점수']
    : ['열정', 'intraId (Lv)', '상태메시지', '경험치'];

  const pageChangeHandler = (pages: number) => {
    pageInfo.setPage(pages);
    router.push('/rank');
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.division}
					${!isRankMode && styles.normal}`}
        >
          {divisionList.map((item: string) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        {children}
      </div>
      <PageNation
        curPage={pageInfo.currentPage}
        totalPages={pageInfo.totalPage}
        pageChangeHandler={pageChangeHandler}
      />
    </>
  );
}
