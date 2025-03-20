import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DailyFact from "../../components/Cards/DailyFact";
import QuoteOfTheDay from "../../components/Cards/QuoteOfTheDay";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Confession = () => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handlePost = () => {
    if (post.trim() || image) {
      const newPost = { text: post, image, time: new Date().toLocaleString() };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setPost("");
      setImage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPost((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <Header />

      <div className="flex justify-center gap-6 p-6 min-h-screen pb-20">
        {/* Bên trái - Tổng quan */}
        <div className="flex-[2] bg-gray-100 p-4 rounded-lg shadow-md h-fit transform hover:scale-105 in-ease-in duration-700">
          <h2 className="text-lg font-semibold">Tổng quan</h2>
          <p className="text-gray-600 mt-2">Nội dung tổng quan có thể thêm ở đây...</p>
        </div>

        {/* Chính giữa - Đăng bài */}
        <div className="flex-[3] bg-white p-4 rounded-lg shadow-md overflow-auto">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <div className="flex gap-2 mt-2 justify-end ">
            <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200  transform hover:scale-105 in-ease-in duration-700">
              <i className="fas fa-photo-video text-green-600"></i>
              <strong>Photo</strong>
            </label>
            <input type="file" id="file-upload" className="hidden" onChange={handleImageChange} />

            <button
              className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200  transform hover:scale-105 in-ease-in duration-700"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <i className="fas fa-smile text-yellow-500"></i>
              <strong>Emoji</strong>
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {image && (
            <img src={image} alt="Preview" className="mt-2 w-full max-h-[500px] object-contain rounded-lg" />
          )}

          <button className="w-full bg-black text-pornhub-200 text-lg py-2 rounded mt-2 hover:bg-gray-800 duration-300" onClick={handlePost}>
            <strong>Post</strong>
          </button>

          {/* Hiển thị bài đăng */}
          <div className="max-w-2xl mx-auto mt-5">
            {posts.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src="https://th.bing.com/th/id/OIP.uXx8Hh8ZcVsSHb-LR1twFAHaHa?rs=1&pid=ImgDetMain"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-2">
                    <p className="text-lg font-semibold">Cuongdz</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
                <p>{item.text}</p>
                {item.image && (
                  <img src={item.image} alt="Post" className="mt-2 w-full max-h-[500px] object-contain rounded-lg" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bên phải - Quote + Fact */}
        <div className="flex-[2] space-y-4 h-fit">
          <DailyFact />
          <QuoteOfTheDay />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Confession;
