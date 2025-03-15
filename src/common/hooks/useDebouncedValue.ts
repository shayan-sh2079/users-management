import { useEffect, useState } from "react";

const useDebouncedValue = <T>(initialValue: T) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(initialValue), 500);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [initialValue]);

  return debouncedValue;
};

export default useDebouncedValue;
