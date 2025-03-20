import { useState, useEffect } from "react";

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await fetch("http://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <div className="p-4 shadow-lg rounded-lg max-w-md mx-auto mt-4 bg-white transform hover:scale-105 in-ease-in duration-700">
      <h2 className="text-lg font-bold mb-2">Today's Quote 🥸</h2>
      <p className="text-lg italic">“{quote}”</p>
      <p className="text-right mt-2 text-sm text-gray-500">— {author}</p>
      </div>
    </>
  );
};

export default QuoteOfTheDay;
