import { useRouter } from 'next/router';
import { Mode } from 'types/mainType';
import PageNation from 'components/Pagination';
import styles from 'styles/rank/RankList.module.scss';

interface PageInfo {
  currentPage?: number;
  totalPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
interface RankListFrameProps {
  children: React.ReactNode;
  isMain: boolean;
  modeType?: Mode;
  pageInfo: PageInfo;
}

export default function RankListFrame({
  children,
  isMain,
  modeType,
  pageInfo,
}: RankListFrameProps) {
  const mainTitle = modeType === 'rank' ? 'Champion' : 'Vips';
  const divisionList =
    modeType === 'rank'
      ? ['순위', 'intraId', '상태메시지', '점수']
      : ['열정', 'intraId (Lv)', '상태메시지', '경험치'];
  const router = useRouter();

  const pageChangeHandler = (pages: number) => {
    pageInfo.setPage(pages);
    router.push('/rank');
  };

  return (
    <>
      {isMain ? (
        <div className={styles.mainContainer}>
          <div className={styles.mainTitle}>{mainTitle}</div>
          {children}
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.division}>
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
      )}
    </>
  );
}
