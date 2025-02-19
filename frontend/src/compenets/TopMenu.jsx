// src/components/TopMenu.jsx
import { useState } from 'react';

function TopMenu() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button id="ct-toggle-top-menu-icon" onClick={() => setIsExpanded(!isExpanded)}>
        Toggle Menu
      </button>
      <div id="ct-top-menu" className={`menu ${isExpanded ? 'ct-top-menu-expanded' : 'hidden'}`}>
        Menu Content
      </div>
    </>
  );
}

export default TopMenu;
