"use client";
import { useState, useEffect, useCallback } from "react";

function BgNav({ children }: { children: React.ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setBackgroundColor(true);
    } else {
      setBackgroundColor(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={`navbar fixed top-0 inset-x-0 z-[100] transition-colors duration-200 ${
        backgroundColor && "bg-primary/20 backdrop-blur-sm"
      }`}
    >
      {children}
    </div>
  );
}

export default BgNav;
