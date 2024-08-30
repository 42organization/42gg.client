import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoCaretBackSharp,
  IoCaretForwardSharp,
} from 'react-icons/io5';
import styles from 'styles/PageNation.module.scss';

interface GreetingProps {
  curPage: number | undefined;
  totalPages: number | undefined;
  pageChangeHandler: (pageNumber: number) => void;
}

function PageNation({
  curPage = 1,
  totalPages,
  pageChangeHandler,
}: GreetingProps) {
  const router = useRouter();
  return (
    <div className={router.pathname.includes('takgu') ? '' : styles.container}>
      {!!totalPages && (
        <Pagination
          activePage={curPage}
          itemsCountPerPage={1}
          pageRangeDisplayed={5}
          totalItemsCount={totalPages}
          firstPageText={<IoPlaySkipBackSharp />}
          lastPageText={<IoPlaySkipForwardSharp />}
          prevPageText={<IoCaretBackSharp />}
          nextPageText={<IoCaretForwardSharp />}
          onChange={(page) => pageChangeHandler(page)}
        />
      )}
    </div>
  );
}

export default PageNation;
