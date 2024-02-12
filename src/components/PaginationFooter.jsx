import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './PaginationFooter.css';

function PaginationFooter({
  itemsPerPage,
  total_pages,
  current_page,
  nextpage,
  previouspage,
  cpage,
}) {
  const handleCurrentPage = (evt) => {
    const newOffset = current_page + 1;
    cpage(newOffset);
  };

  const setPreviousPage = () => {
    if (current_page !== firstIndex) {
      previouspage();
    }
  };
  const setNextPage = () => {
    if (current_page !== lastIndex) {
      nextpage();
    }
  };
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      pageCount={total_pages}
      onClick={handleCurrentPage}
      containerClassName={'paginationBttns'}
      previousLinkClassName={'previousBttn'}
      nextLinkClassName={'nextBttn'}
      disabledClassName={'paginationDisabled'}
      activeClassName={'paginationActive'}
    />
  );
}

export default PaginationFooter;
