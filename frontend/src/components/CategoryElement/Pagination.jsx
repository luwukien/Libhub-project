const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page); // Gọi hàm cập nhật state
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
      >
        <i className="fa-solid fa-less-than"></i>
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentPage === page ? "bg-pornhub-200 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
      >
        <i className="fa-solid fa-greater-than"></i>
      </button>
    </div>
  );
};

export default Pagination;
