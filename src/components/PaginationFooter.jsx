import React from 'react';
import ReactPaginate from 'react-paginate';
import './PaginationFooter.css';

function PaginationFooter({
  total_pages,
  current_page,
  nextpage,
  previouspage,
  cpage,
}) {
  const recordPerPage = 20;
  const lastIndex = current_page * recordPerPage;
  //const [numbers, setNumbers] = useState(0);
  let numbers = 0;
  const firstIndex = lastIndex - recordPerPage;
  let totalpages = total_pages;

  const getPagination = () => {
    let pageItems = [];
    for (let i = 1; i <= total_pages; i++) {
      let activeClass = '';
      if (current_page === i) {
        activeClass = 'active';
      }
      pageItems.push(
        <button
          onClick={handleCurrentPage}
          value={i}
          className={i === current_page ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pageItems;
  };
  const handleCurrentPage = (evt) => {
    console.log(evt);
    cpage(evt.selected);
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
      onPageChange={handleCurrentPage}
      containerClassName={'paginationBttns'}
      previousLinkClassName={'previousBttn'}
      nextLinkClassName={'nextBttn'}
      disabledClassName={'paginationDisabled'}
      activeClassName={'paginationActive'}
    />
  );
}

export default PaginationFooter;
