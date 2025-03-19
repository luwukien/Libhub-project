import React from "react";
import Header from "../../components/layouts/Header";
import { useSearch } from "../../utils/useSearch";
import Footer from "../../components/layouts/Footer";
import "./styles.css";
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

      <main className=" ">
        <div className="relative h-[400px]">
          <div
            className="absolute flex flex-col items-center justify-center top-0 bottom-0 bg-slate-500 w-full h-[400px] bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('./public/bg-about-2.jpg')",
            }}
          >
            <h1 className="text-white text-[80px] font-bold">About Us</h1>
            <h2 className="text-white text-2xl font-bold">
              For explorers everywhere.
            </h2>
          </div>
        </div>
        <div className="wrapper">
          <div className="pt-[70px] font-NunitoSans text-lg text-[#4B4B4B]">
            <p className="mt-4">
              Libhub stands for Library Hub. This is an innovative improvement
              to the schools library system, designed to enhance students
              learning experience. It simplifies the search for academic
              resources, making it easier to find relevant materials.{" "}
            </p>
            
            <p className="mt-4">
              Libhub, simplifies resource searching and provides a virtual
              library simulation, making it easier for students to access and
              explore academic materials. We aim to optimize UI/UX to make the
              library more user-friendly and interesting.
            </p>
            <p className="mt-4">
              As a reader and at FPT University, we want to create a
              student-friendly library that helps them enjoy reading. Not only
              is it a quiet space to study, the library is also a place to
              inspire, stimulate creativity and connect knowledge-loving souls.
            </p>
            <p className="mt-4">
              We believe that reading not only helps expand knowledge but is
              also the key to developing critical thinking and creativity.
            </p>
            <p className="mt-4">
              Therefore, our library not only provides thousands of books in
              many different fields but also makes it easy for them to access
              the books by indicating their location on the bookshelf.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default About;
