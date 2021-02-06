import './Pagination.css';

import * as React from 'react';
import {useCallback} from 'react';
import ReactPaginate from 'react-paginate';
import {useHistory} from 'react-router-dom';

interface Props {
  pageData: PageData;
}

export const Pagination: React.FC<Props> = ({pageData}) => {
  let history = useHistory();

  const handlePageChange = useCallback(
    ({selected}) => {
      history.push(`/images/${selected}`);
    },
    [history],
  );

  return (
    <div className="Pagination">
      <ReactPaginate
        pageCount={pageData.pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        initialPage={pageData.page}
      />
    </div>
  );
};
