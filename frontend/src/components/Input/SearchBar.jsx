import React from 'react'
import Glass from '../Cards/Glass'
import { IoMdClose } from "react-icons/io"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const navigate = useNavigate();
  return (
    <div className="w-96 flex items-center px-4 bg-gray-100 rounded-full">
        <input
          type="text"
          placeholder="Title book, author, ISBN, ..."
          className="w-full py-[11px] outline-none bg-transparent text-sx"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        />

        {
          value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={() => {
            onClearSearch();
            navigate("/category/All")
          }} />
        }
        <FaMagnifyingGlass 
        className="text-slate-400 cursor-pointer hover:text-pornhub-200"
        onClick={handleSearch}/>
      </div>
  )
}

export default SearchBar