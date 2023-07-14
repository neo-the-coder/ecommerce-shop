import React, { useEffect, useState } from "react";
// import Icon
import { PiCaretDoubleUpBold } from 'react-icons/pi';

function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    function toggleScrollButton() {
      if (window.scrollY >= 250) {
        // show toTop button
        if (!showScroll) setShowScroll(true);
      } else {
        // hide toTop button
        if (showScroll) setShowScroll(false);
      }
    }

    document.addEventListener("scroll", toggleScrollButton);
    return () => {
      document.removeEventListener("scroll", toggleScrollButton);
    };
  }, [showScroll]);

  return <button className={`fixed bottom-10 right-5 bg-accent text-white p-3.5 rounded-md transition-all ${showScroll ? 'block translate-x-0 ' : 'translate-x-[100px] '}`} title="Back to Top" onClick={handleScrollToTop}>
    <PiCaretDoubleUpBold className="w-5 h-5"/>
  </button>;
}

export default ScrollToTop;
