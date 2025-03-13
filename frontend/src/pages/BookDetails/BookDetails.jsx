import { useParams } from 'react-router-dom';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

const BookDetails = () => {
  const { bookName } = useParams(); // Get parameter from URL
  const products = [
    {
      image: "https://via.placeholder.com/150", // Thay bằng URL hình ảnh thực tế
      title: "Toán 1",
      description:
        "Nhà xuất bản Giáo dục Việt Nam xuất bản Đại học Sư phạm. Tác giả: GS.TSKH Đỗ Đức Thái (Tổng Chủ biên), PGS. TS Đỗ Tiến Đạt (Chủ biên), TS Nguyễn Hòa Anh, TS Trần Thủy Ngân, CN Nguyễn Thị Thanh Sơn",
      price: "26.900 VNĐ",
      code: "HOTCO",
      category: "Sách Giáo Khoa",
      publisher: "Nhà xuất bản Đại học Sư phạm",
      authors:
        "GS.TSKH Đỗ Đức Thái (Tổng Chủ biên), PGS. TS Đỗ Tiến Đạt (Chủ biên), TS Nguyễn Hòa Anh, TS Trần Thủy Ngân, CN Nguyễn Thị Thanh Sơn",
    },
    {
      image: "https://via.placeholder.com/150", // Thay bằng URL hình ảnh khác
      title: "Toán 2",
      description:
        "Nhà xuất bản Giáo dục Việt Nam xuất bản Đại học Sư phạm. Tác giả: GS.TSKH Đỗ Đức Thái (Tổng Chủ biên), PGS. TS Đỗ Tiến Đạt (Chủ biên), TS Nguyễn Hòa Anh, TS Trần Thủy Ngân, CN Nguyễn Thị Thanh Sơn",
      price: "29.500 VNĐ",
      code: "HOTCO2",
      category: "Sách Giáo Khoa",
      publisher: "Nhà xuất bản Đại học Sư phạm",
      authors:
        "GS.TSKH Đỗ Đức Thái (Tổng Chủ biên), PGS. TS Đỗ Tiến Đạt (Chủ biên), TS Nguyễn Hòa Anh, TS Trần Thủy Ngân, CN Nguyễn Thị Thanh Sơn",
    },
  ];
  return (
    <>
      <div className="content-wrapper font-NunitoSans">
        <header>
          <Header />
        </header> {/*End header */}

        <main className='bg-[##fffefa] min-h-screen py-8'>
          <div className='container mx-auto max-w-screen-2xl    '>
            <div className='product-container'>

              <div className='product-main bg-slate-600 '>
                <div className='bg-black'>
                  <div>Kiên</div>
                </div>
              </div>{/* End product main */}

              <div className='product-description'>
                <div></div>
              </div>{/* End product description */}

            </div> {/* End product-container */}
          </div> {/* End container */}
        </main> {/* End main */}

        <footer>
          {/* <Footer /> */}
        </footer> {/*End footer */}
      </div>  {/*End content-wrapper */}
    </>
  );
};
export default BookDetails;