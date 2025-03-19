import React from 'react';
import Header from '../../components/layouts/Header';
import { useSearch } from '../../utils/useSearch';
import Footer from '../../components/layouts/Footer';
const About = () => {
  const {
    userInfo,
    searchQuery,
    setSearchQuery,
    onSearchBook,
    handleClearSearch,
  } = useSearch();


  return (
    <div className="content-wrapper font-NunitoSans">
      <header className="mb-0">
        <Header
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchBook}
          handleClearSearch={handleClearSearch}
        />
      </header>

      <main className=''>
        <div className='relative h-[400px]'>
          <div
            className="bg-slate-500 absolute top-0 left-0 w-full h-[400px] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('./public/bg-about-2.jpg')", filter: 'blur(1px)' }}
          >
          </div>
          <div className='absolute ct-subheadline top-0 left-0 w-full  h-[400px] bg-gray-100 bg-opacity-50 '>
            Know us better
          </div>
        </div>
        <div className='container '>
          <div className='  '>
            Libhub stands for Library Hub. This is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials. Libhub, simplifies resource searching and provides a virtual library simulation, making it easier for students to access and explore academic materials. We aim to optimize UI/UX to make the library more user-friendly and interesting.

          </div>
          <div>
            Thanh vien
          </div>
        </div>
      </main>

      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  );


};
export default About;