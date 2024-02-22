import { useState, useEffect } from "react";

const SCREEN_SM = 640;
const SCREEN_MD = 768;
const SCREEN_LG = 1024;
const SCREEN_XL = 1280;
const SCREEN_2XL = 1536;

const useResize = () => {
  const [widthScreen, setWidthScreen] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  const handleResize = (event: any) => setWidthScreen(event.target.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    widthScreen,
    isScreenSm: widthScreen >= SCREEN_SM,
    isScreenMd: widthScreen >= SCREEN_MD,
    isScreenLg: widthScreen >= SCREEN_LG,
    isScreenXl: widthScreen >= SCREEN_XL,
    isScreenXxl: widthScreen >= SCREEN_2XL
  };
};
export default useResize;
