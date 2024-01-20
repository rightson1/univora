"use client";
import { useState, useEffect, useRef } from "react";

function useScreenFunc() {
  const [screenWidth, setScreenWidth] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
}

function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 4; // Adjust this value as needed

      if (scrollTop > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}
// function useScrollDirection() {
//   const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
//     null
//   );
//   const prevScrollY = useRef<number>(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > prevScrollY.current) {
//         setScrollDirection("down");
//       } else if (currentScrollY < prevScrollY.current) {
//         setScrollDirection("up");
//       }

//       prevScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return scrollDirection;
// }

export default function useScreen() {
  const screenWidth = useScreenFunc();
  const isScrolled = useScroll();
  // const scrollDirection = useScrollDirection();

  return { screenWidth, scrolled: isScrolled };
}
