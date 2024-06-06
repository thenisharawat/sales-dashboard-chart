// paginationButtons.jsx
import React from "react";

const PaginationButtons = ({
  currentPage,
  onPageChange,
  totalPages,
  selectPerPage,
  onSetPerPage,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handlePerPageChange = (event) => {
    onSetPerPage(event.target.value);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <span className="page-info"> Page No: {currentPage} </span>
      <div class="button-container">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`pagination-button ${
              currentPage === pageNumber ? "active" : ""
            }`}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="per-page">
        <span> Per Page: </span>
        <select
          name="selectPerPage"
          value={selectPerPage}
          onChange={handlePerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationButtons;
