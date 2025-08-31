import React, { useRef } from 'react'
import './Header.css'

const Header = () => {
  const scrollAnimationRef = useRef(null); // to store animation id

  const stopScrolling = () => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
      window.removeEventListener("click", stopScrolling);
      window.removeEventListener("wheel", stopScrolling);
      window.removeEventListener("touchstart", stopScrolling);
    }
  };

  const handleScroll = () => {
    const section = document.getElementById("food-display");
    if (section) {
      // Step 1: Scroll to top of FoodDisplay
      section.scrollIntoView({ behavior: "smooth" });

      // Step 2: After short delay, start auto-scrolling
      setTimeout(() => {
        const endScroll = section.offsetTop + section.scrollHeight - window.innerHeight;
        const scrollStep = 2; // pixels per frame (lower = slower)

        const scrollSmooth = () => {
          if (window.scrollY < endScroll) {
            window.scrollBy(0, scrollStep);
            scrollAnimationRef.current = requestAnimationFrame(scrollSmooth);
          }
        };

        // Attach listeners to stop if user interacts
        window.addEventListener("click", stopScrolling);
        window.addEventListener("wheel", stopScrolling);
        window.addEventListener("touchstart", stopScrolling);

        requestAnimationFrame(scrollSmooth);
      }, 800); // delay so smooth scrollIntoView finishes
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite <span>food</span> here</h2>
        <p>
          Choose from a diverse menu featuring a detectable array of dishes crafted 
          with the finest ingredients and culinary expertise. Our mission is to satisfy 
          your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        <button onClick={handleScroll}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
