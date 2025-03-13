import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdAdd, MdUpdate, MdDeleteOutline } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify"

const AddEditBook = ({ 
    bookInfo,
    type,
    onClose,
    getAllBooks,

}) => {

  const [date, setDate] = useState(bookInfo?.date || null);
  const [title, setTitle] = useState(bookInfo?.title || "");
  const [bookCover, setBookCover] = useState(bookInfo?.imageUrl || null);
  const [story, setStory] = useState(bookInfo?.story || "");
  const [author, setAuthor] = useState(bookInfo?.author || "");
  const [remainingBook, setRemainingBook] = useState(bookInfo?.remainingBook || "");
  const [category, setCategory] = useState(bookInfo?.category || []);
  const [error, setError] = useState("");

  const updateBook = async () => {
    const bookId = bookInfo._id;
    try{
      let imageUrl = "";

      let postData = {
        title,
        category,
        author,
        story,
        imageUrl: bookInfo.imageUrl || "",
        date: date
          ? moment(date).valueOf()
          : moment().valueOf(),
        remainingBook,
      }

      if(typeof bookCover === "object") {
        const imgUploadRes = await uploadImage(bookCover);
        imageUrl = imgUploadRes.imageUrl || "";

        postData = {
          ...postData,
          imageUrl: imageUrl,
        };
      }

      const response = await axiosInstance.put("/edit-book/" + bookId, postData)
      if(response.data && response.data.story){
        toast.success("Book updated successfully", {
          autoClose: 1000,
        });
        onClose();
      }

    }catch(error){
      if(error.response && 
        error.response.data && 
        error.response.data.message
      ){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred.Please try again!")
      }
    }
  }

  const addNewBook = async () => {
    try{
      let imageUrl = "";

      if(bookCover){
        const imgUploadRes = await uploadImage(bookCover);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-book", {
        title,
        category,
        author,
        story,
        imageUrl: imageUrl || "",
        date: date
          ? moment(date).valueOf()
          : moment().valueOf(),
        remainingBook,
      })
      if(response.data && response.data.story){
        toast.success("Book added successfully", {
          autoClose: 1000,
        });
        getAllBooks();
        onClose();
      }

    }catch(error){
      if(error.response && 
        error.response.data && 
        error.response.data.message
      ){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred.Please try again!")
      }
    }
  }

  const handleAddOrUpdateClick = () => {

    if(!title || !story || !author || !bookCover || !date || !remainingBook){
      setError("All field are required!");
      return ;
    }
    setError("");

    if(type === "edit"){
      updateBook();
    } else {
      addNewBook();
    }

  }
  
  const handleDeleteBookCover = async () => {
    const deleteImgRes = await axiosInstance.delete("/delete-image", {
      query : {
        imageUrl : bookInfo.imageUrl,
      },
    });

    if(deleteImgRes.data){
      const bookId = bookInfo._id;

      const postData = {
        title,
        category,
        author,
        story,
        imageUrl: "",
        date: moment().valueOf(),
        remainingBook,
      };
      const response = await axiosInstance.put("/edit-book/" + bookId, postData);
      setBookCover(null);
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justufy-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Book" : "Edit Book"}
        </h5>

        <div className="absolute top-4 right-0">
            <div className=" flex items-center gap-2 bg-white p-2 rounded-l-lg shadow-md">
              {type === 'add' ? <button className="btn-small flex items-center gap-1" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD BOOK
              </button>
              :
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg"/> EDIT BOOK
                </button> 
              </> 
            }

              <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
                <MdClose className="text-xl text-gray-500 hover:text-pornhub-200" />
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
            )}
          </div>
        </div>
      
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Your book title"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
        <div className="my-3">
          <DateSelector date={date} setDate={setDate}/>
        </div>
          
        <ImageSelector
        image={bookCover}
        setImage={setBookCover}
        handleDeleteImg={handleDeleteBookCover}
        />
        
        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">STORY</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="Your Story"
           rows={10}
           value={story}
           onChange={({ target }) => setStory(target.value)}
           />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">AUTHOR</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="AUTHOR"
           rows={10}
           value={author}
           onChange={({ target }) => setAuthor(target.value)}
           />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">REMAININGBOOK</label>
          <textarea
           type="number"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="REMAININGBOOK"
           rows={10}
           value={remainingBook}
           onChange={({ target }) => setRemainingBook(target.value)}
           />
        </div>

        <div className="pt-3">
          <label className="input-label">CATEGORY</label>
          <TagInput tags={category} setTags={setCategory} />
        </div>  
        
      </div>

      </div>
  )
}

export default AddEditBook