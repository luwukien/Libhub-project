import { useNavigate } from "react-router-dom";

const Filter = ({ id, title, selectedCategory, setSelectedCategory}) => {
  const navigate = useNavigate();
  return (
      <li>
        <div className="filter-option">
          <input
            type="radio"
            id={id}
            name="category"
            checked={selectedCategory.title === title}
            onChange={() => {
              setSelectedCategory({ title });
              navigate(`/category/${title}`);
            }}
            className="flex-none"
          />
          <label htmlFor={id}>{title}</label>
        </div>
      </li>
    );
  };
  
  export default Filter;
  