import { Dispatch, SetStateAction } from 'react';
import Pagination from 'react-js-pagination';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoCaretBackSharp,
  IoCaretForwardSharp,
} from 'react-icons/io5';

interface GreetingProps {
  curPage: number | undefined;
  totalPages: number | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PageNation({
  curPage = 1,
  totalPages,
  setCurrentPage,
}: GreetingProps) {
  return (
    <>
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
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}

export default PageNation;
