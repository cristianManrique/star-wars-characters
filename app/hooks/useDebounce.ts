import { useState, useEffect } from "react";

/**
 * Hook: useDebounce
 * Delays the update of a value until after a specified delay has passed since the last time the value was changed.
 * Useful for optimizing performance by reducing the frequency of updates, such as in search input fields.
 * @param {string} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns [ debounced, setDebounced ]
 */
const useDebounce = (value: string, delay: number = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => setDebounced(value), delay);
    // Cleanup function to clear the timeout if the value changes
    // before the delay has passed, preventing unnecessary updates
    return () => clearTimeout(timer);
  }, [value, delay]);

  return [debounced, setDebounced];
};

export { useDebounce };
