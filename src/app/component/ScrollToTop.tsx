"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./ScrollToTop.module.css"; // import CSS module

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 200;
            setVisible(prev => prev !== shouldShow ? shouldShow : prev);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button className={styles.button} onClick={scrollToTop}>
        <svg viewBox="0 0 384 512" className={styles.svgIcon}>
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 
          32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 
          32 32 32s32-14.3 32-32V141.2L329.4 
          246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
          0-45.3l-160-160z"></path>
        </svg>
      </button>
    )
  );
}
