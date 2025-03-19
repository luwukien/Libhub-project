import React, { useEffect, useState } from "react";
import Header from '../../components/layouts/Header';
import { useSearch } from '../../utils/useSearch';
import Footer from '../../components/layouts/Footer';
import CardMember from "../../components/Cards/CardMember";
import CardSlider from "../../components/Cards/CardSlider";
const About = () => {
  const {
    searchQuery,
    setSearchQuery,
    onSearchBook,
    handleClearSearch,
  } = useSearch();
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  //Data members
  const members = [
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Đặng Cường",
      role: "Leader",
      quote: "Suc cheo khong",
      linktoFacebook: "https://www.facebook.com/caocuong.dang.7524",
      linktoIntasgram: "#",
      linktoEmail: "mailto:nguyen.hiep@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Nguyễn Dũng",
      role: "Tech Lead, Backend Developer",
      quote: "Hat dau nho",
      linktoFacebook: "https://www.facebook.com/hat.au.nho.983082",
      linktoIntasgram: "https://instagram.com/tran.anh",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Nguyễn Hiệp",
      role: "Backend Developer",
      quote: "Boy phố làm bố các em",
      linktoFacebook: "https://www.facebook.com/hieppotato",
      linktoIntasgram: "https://instagram.com/tran.anh",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Quốc Anh",
      role: "Frontend Developer",
      quote: "dang code",
      linktoFacebook: "https://www.facebook.com/adonis.quocanh",
      linktoIntasgram: "https://instagram.com/tran.anh",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Hoàng Thảo",
      role: "Frontend Developer",
      quote: "Cac",
      linktoFacebook: "https://www.facebook.com/kingkind.k6",
      linktoIntasgram: "https://instagram.com/tran.anh",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Lưu Kiên",
      role: "Frontend Developer",
      quote: "Deo hieu code",
      linktoFacebook: "https://www.facebook.com/kienchiluu2910",
      linktoIntasgram: "https://instagram.com/tran.anh",
      linktoEmail: "mailto:tran.anh@example.com",
    },
  ];

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
        </div>
        <div className="bg-gray-100 h-auto">
          <div className="ct-subheadline mt-5 ">
            Meet Our Team
          </div>
          <div className="p-9">
            <CardSlider items={members} Component={CardMember} />
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );


};
export default About;