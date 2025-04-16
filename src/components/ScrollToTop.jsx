import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
    const location = useLocation();
    const hasNavigated = useRef(false);

    useEffect(() => {
      if (hasNavigated.current) {
        window.scrollTo(0, 0);
      }
    }, [location]);
  
    useEffect(() => {

      const handleScroll = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    useEffect(() => {

      const savedScrollY = sessionStorage.getItem("scrollPosition");
  
      if (savedScrollY) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        }, 100);
      }
  
      hasNavigated.current = true;
    }, []);
  
    return null;
  };
  
  export default ScrollToTop;