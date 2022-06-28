import Pagination from 'react-js-pagination';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoCaretBackSharp,
  IoCaretForwardSharp,
} from 'react-icons/io5';
import styles from 'styles/Pagination.module.scss';

interface GreetingProps {
  curPage: number | undefined;
  totalPages: number | undefined;
  pageChangeHandler: (page: number) => void;
}

function PageNation({
  curPage = 1,
  totalPages,
  pageChangeHandler,
}: GreetingProps) {
  return (
    <>
      {totalPages && (
        <ul className={styles.pagination}>
          <Pagination
            activePage={curPage}
            itemsCountPerPage={1}
            pageRangeDisplayed={5}
            totalItemsCount={totalPages}
            firstPageText={<IoPlaySkipBackSharp />}
            lastPageText={<IoPlaySkipForwardSharp />}
            prevPageText={<IoCaretBackSharp />}
            nextPageText={<IoCaretForwardSharp />}
            onChange={pageChangeHandler}
          />
        </ul>
      )}
    </>
  );
}

export default PageNation;
