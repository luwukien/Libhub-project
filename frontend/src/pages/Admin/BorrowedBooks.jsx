import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import ViewBorrowedBooks from "./ViewBorrowedBooks";
import ViewPendingRequest from "./ViewPendingRequest";

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State tìm kiếm

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const [openPendingModal, setOpenPendingModal] = useState({
    isShown: false,
  });

  const handleViewBorrowedBooks = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const handleViewPendingRequest = () => {
    setOpenPendingModal({ isShown: true });
  };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-users");
      if (response.data && response.data.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Lọc danh sách user theo searchTerm
  const filteredUsers = allUsers.filter((user) =>
    user.MSSV.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Header với Users List và Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">Users List</h2>
            
            {/* Ô tìm kiếm user */}
            <input
              type="text"
              placeholder="Search user..."
              className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Nút Pending Request */}
          <button
            className="text-xl font-semibold bg-black hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
            onClick={() => handleViewPendingRequest()}
          >
            Pending Request
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-500 rounded-2xl">
          <table className="min-w-full bg-white border border-gray-400 shadow-md rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-center">
                <th className="py-3 px-6 border-r border-gray-300 w-1/3">User</th>
                <th className="py-3 px-6 border-r border-gray-300 w-1/3">Borrowed Books</th>
                <th className="py-3 px-6 border-gray-300 w-1/3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-300 text-center hover:bg-gray-50">
                  <td className="py-3 px-6 border-r border-gray-300 flex items-center justify-start gap-3">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-12 h-12 object-cover rounded-full border border-gray-300"
                    />
                    <span className="text-gray-700 font-medium">{user.fullName}</span>
                  </td>
                  <td className="py-3 px-6 border-r border-gray-300">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleViewBorrowedBooks(user)}
                    >
                      Borrowed Books
                    </button>
                  </td>

                  <td className="py-3 px-6 font-semibold text-sm">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg text-white ${
                        user.status === "Returned"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={user.status === "Returned"}
                    >
                      {user.status === "Returned" ? "Returned" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div>
        <Modal
          isOpen={openViewModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 999,
            },
          }}
          appElement={document.getElementById("root")}
          className="model-box relative"
        >
          <ViewBorrowedBooks
            userInfo={openViewModal.data}
            onClose={() => {
              setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            }}
          />
        </Modal>

        <Modal
          isOpen={openPendingModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 999,
            },
          }}
          appElement={document.getElementById("root")}
          className="model-box relative"
        >
          <ViewPendingRequest
            onClose={() => {
              setOpenPendingModal((prevState) => ({ ...prevState, isShown: false }));
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default BorrowedBooks;
