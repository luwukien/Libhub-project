import React, { useEffect, useState } from "react";

const DailyFact = () => {
  const [fact, setFact] = useState("Loading...");

  useEffect(() => {
    fetch("https://uselessfacts.jsph.pl/today.json?language=en")
      .then((res) => res.json())
      .then((data) => setFact(data.text))
      .catch(() => setFact("Failed to load fact 😢"));
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white  transform hover:scale-105 in-ease-in duration-700">
      <h2 className="text-lg font-bold mb-2">Today's Useless Fact 🤓</h2>
      <p>{fact}</p>
    </div>
  );
};

export default DailyFact;
