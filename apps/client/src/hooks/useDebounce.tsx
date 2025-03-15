import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler); // Limpiar timeout si el valor cambia antes de que pase el delay
      };
    }, [value, delay]);
  
    return debouncedValue;
  };