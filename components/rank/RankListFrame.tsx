import { useRouter } from 'next/router';
import { MatchMode } from 'types/mainType';
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
  toggleMode: MatchMode;
}

export default function RankListFrame({
  children,
  pageInfo,
  toggleMode,
}: RankListFrameProps) {
  const router = useRouter();
  const division: { [key: string]: string[] } = {
    rank: ['순위', 'intraId', '상태메시지', '탁구력'],
    normal: ['열정', 'intraId (Lv)', '상태메시지', '경험치'],
  };

  const pageChangeHandler = (pages: number) => {
    pageInfo.setPage(pages);
    router.push('/rank');
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.division}
					${toggleMode === 'normal' && styles.normal}`}
        >
          {division[toggleMode].map((item: string) => (
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
