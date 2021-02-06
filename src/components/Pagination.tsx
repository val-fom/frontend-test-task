import './Pagination.css';

import * as React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
  pageData: PageData;
  onPageChange: ({selected}: {selected: number}) => void;
}

export const Pagination: React.FC<Props> = ({pageData, onPageChange}) => {
  return (
    <div className="Pagination">
      <ReactPaginate
        pageCount={pageData.pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        initialPage={pageData.page}
      />
    </div>
  );
};
