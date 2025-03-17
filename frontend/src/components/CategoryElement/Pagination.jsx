const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page); // Gọi hàm cập nhật state
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};


export default Pagination;