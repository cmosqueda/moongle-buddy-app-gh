// custom hook for loading splash screen upon initial boot

import { useState, useEffect } from "react";

export const useSplashScreen = (duration: number = 3000) => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); //hide splash screen after duration
    }, duration);
    // cleanup timeout when component unmounts
    return () => clearTimeout(timer);
  }, [duration]);

  return isSplashVisible;
};
