import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import './PaginationFooter.css';

function PaginationFooter({
  itemsPerPage,
  total_pages,
  current_page,
  nextpage,
  previouspage,
  cpage,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const PageNumbers = [];

  for (let i = 1; i <= total_pages; i++) {
    PageNumbers.push(i);
  }

  const decrement = (evt) => {
    if (current_page > 0) {
      previouspage();
    }
  };
  const increment = (evt) => {
    if (current_page < total_pages) {
      nextpage();
    }
  };
  return (
    <div className="flex-row-container-filter">
      <div className="flex-row-item">
        <a onClick={decrement}>
          <i className="arrow left"></i>
          Prev
        </a>
      </div>
      <div className="flex-row-item">
        <p style={{ color: 'teal' }}> {current_page} </p>
      </div>
      <div className="flex-row-item">
        <a onClick={increment}>
          Next
          <i className="arrow right"></i>
        </a>
      </div>
    </div>
  );
}

export default PaginationFooter;
