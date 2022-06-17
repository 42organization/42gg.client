import Pagination from 'react-js-pagination';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoCaretBackSharp,
  IoCaretForwardSharp,
} from 'react-icons/io5';

interface GreetingProps {
  curPage: number;
  totalPages: number;
  pageChangeHandler: (page: number) => any;
}

function PageNation({ curPage, totalPages, pageChangeHandler }: GreetingProps) {
  return (
    <>
      {totalPages ? (
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
      ) : null}
    </>
  );
}

export default PageNation;
