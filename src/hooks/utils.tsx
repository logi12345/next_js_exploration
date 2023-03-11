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

// import { useEffect, useState } from "react";
// import { Descendant } from "slate";

// export default function useLocalStorage(
//   key: string,
//   initialValue: Descendant[]
// ) {
//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     useEffect(() => {
//       try {
//         // Get from local storage by key
//         const item = localStorage.getItem(key);
//         // Parse stored json or if none return initialValue
//         return item ? JSON.parse(item) : initialValue;
//       } catch (error) {
//         // If error also return initialValue
//         console.log(error);
//         return initialValue;
//       }
//     });
//   });

//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value: Descendant[]) => {
//     useEffect(() => {
//       try {
//         // Allow value to be a function so we have same API as useState
//         const valueToStore =
//           value instanceof Function ? value(storedValue) : value;
//         // Save state
//         setStoredValue(valueToStore);
//         // Save to local storage
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       } catch (error) {
//         // A more advanced implementation would handle the error case
//         console.log(error);
//       }
//     });
//   };
//   return [storedValue, setValue];
// }