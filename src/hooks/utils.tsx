import { useEffect, useState } from "react";

export function useLocalStorage<Type>(key: string, fallbackValue: Type) {
  const [value, setValue] = useState(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    console.log(stored);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}

/**
 * Hook used to get height and width window when changed dynamically
 * @returns width window width
 * @returns height window height
 */
const useDimensions = () => {
  const [{ height, width }, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    //Used to set the dimensions
    const windowSize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };

    //callback that happens when the window is resized
    window.addEventListener("resize", windowSize);

    //clean up the callback once the window resize has completed
    return () => window.removeEventListener("resize", windowSize);
  }, []);

  return { width, height };
};

export default useDimensions;
