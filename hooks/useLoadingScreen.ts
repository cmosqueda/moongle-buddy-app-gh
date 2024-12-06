// custom hook for invoking loading screen

import { useState, useEffect } from "react";

export const useLoadingScreen = (duration: number = 3000) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); //hide loading screen
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};
