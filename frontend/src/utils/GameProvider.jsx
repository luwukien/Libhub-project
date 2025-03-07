import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameElement, setGameElement] = useState(null);

  useEffect(() => {
    if (!gameElement) {
      const iframe = document.createElement("iframe");
      iframe.src = "/Build/index.html";
      iframe.width = "100%";
      iframe.height = "600px";
      iframe.style.border = "none";
      iframe.style.display = "block";

      setGameElement(iframe);
    }
  }, [gameElement]);

  return (
    <GameContext.Provider value={{ gameElement }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
